import { ApiProperty } from '@nestjs/swagger';

export enum ApplicationType {
    NODE_APPLICATION = 'node_application',
}

export class PasswordAuth {
    @ApiProperty({ type: String })
    user_name: string;
    @ApiProperty({ type: String })
    password: string;
}

export class SSHKey {
    @ApiProperty({ type: String })
    ssh_key: string;
}

export class GitRepoReq {
    @ApiProperty({ enum: Object.values(ApplicationType) })
    application_type: ApplicationType;

    @ApiProperty({ type: String })
    url: string;

    @ApiProperty({ type: String })
    command: string;
}
