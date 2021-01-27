export interface AppTemplate {

    name: string;

    dockerfile: string;

    description: string;

    logo: string;

    screenshots: { url: string, label: string, description: string }[];

    website: string;

    github: string;

    docs: string;

    author: string;

    image: string;

    version: string;

    revision: number;

    mounts: {
        local: string;
        remote: string;
    }[]

    ports: {
        local: number,
        remote: number
    }[]

    variables: {
        name: string,
        description: string,
        value: string,
    }[]

}