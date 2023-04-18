import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { STSClient, AssumeRoleCommand, AssumeRoleCommandInput } from "@aws-sdk/client-sts";
import { S3Client, AbortMultipartUploadCommand, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
@Injectable()
export class AwsService {
    constructor(private Config: ConfigService) { }
    private S3 = new S3Client({
        credentials: {
            accessKeyId: this.Config.get("ACCESS_KEY"),
            secretAccessKey: this.Config.get("SECRET_KEY"),
        },
        region: 'eu-west-3',
    })

    async getTemporalAccess() {
        const client = new STSClient({
            region: "us-east-1",
            credentials: {
                accessKeyId: this.Config.get("ACCESS_KEY"),
                secretAccessKey: this.Config.get("SECRET_KEY"),
            }
        });
        const params: AssumeRoleCommandInput = {
            RoleArn: "arn:aws:iam::138728962309:role/allowed-back-side",
            RoleSessionName: "name-test",
            DurationSeconds: 900,
        };
        const command = new AssumeRoleCommand(params);

        try {
            const acces_data = await client.send(command);
            return acces_data
        } catch (error) {
            throw error;
        }
    }


    async uploadToS3(file:Express.Multer.File) {
        const params: PutObjectCommandInput = {
            Bucket:this.Config.get('BUCKET_NAME'),
            Key:file.filename,
            Body:file.buffer,
            ContentType:file.mimetype, 
        };

        const command = new PutObjectCommand(params)
        try {
            const response = await this.S3.send(command)
            
            return response ;
        } catch (error) {
            throw error; 
        }
    }
}
