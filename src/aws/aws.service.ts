import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { STSClient, AssumeRoleCommand, AssumeRoleCommandInput } from "@aws-sdk/client-sts";

@Injectable()
export class AwsService {
    constructor( private Config: ConfigService) { }
    async getTemporalAccess() {
        const client = new STSClient({ region: "us-east-1",
        credentials:{
            accessKeyId:this.Config.get("ACCESS_KEY"),
            secretAccessKey:this.Config.get("SECRET_KEY"),
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
}
