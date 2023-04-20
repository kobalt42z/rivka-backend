import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { STSClient, AssumeRoleCommand, AssumeRoleCommandInput } from "@aws-sdk/client-sts";
import { S3Client, AbortMultipartUploadCommand, PutObjectCommand, PutObjectCommandInput, DeleteObjectCommand, DeleteObjectCommandInput } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AwsService {
    constructor(private Config: ConfigService) { }
    private S3 = new S3Client({
        credentials: {
            accessKeyId: this.Config.get("ACCESS_KEY"),
            secretAccessKey: this.Config.get("SECRET_KEY"),
        },
        region: this.Config.get("BUCKET_REGION"),
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


    async uploadToS3(file: Express.Multer.File) {
        const date = new Date();
        const UUIDIMAGE = uuidv4()
        const params: PutObjectCommandInput = {
            Bucket: this.Config.get('BUCKET_NAME'),
            Key: UUIDIMAGE,
            Body: file.buffer,
            ContentType: file.mimetype,
        };


        const command = new PutObjectCommand(params)
        try {
            const response = await this.S3.send(command)

            return UUIDIMAGE;
        } catch (error) {
            throw error;
        }
    }

    async DeletFromS3(key: string) {
        try {
            const params:DeleteObjectCommandInput  = {
                Bucket: this.Config.get('BUCKET_NAME'),
                Key: key,

            };
            const command = new DeleteObjectCommand(params);
            const response = await this.S3.send(command);
            return response 
        } catch (error) {
            throw error
        }
    }
}
