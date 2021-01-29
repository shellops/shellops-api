namespace Docker {

    export interface Container {
        Id: string;
        Created: string;
        Path: string;
        Args: string[];
        State: State;
        Image: string;
        ResolvConfPath: string;
        HostnamePath: string;
        HostsPath: string;
        LogPath: string;
        Name: string;
        RestartCount: number;
        Driver: string;
        Platform: string;
        MountLabel: string;
        ProcessLabel: string;
        AppArmorProfile: string;
        ExecIDs: null;
        HostConfig: HostConfig;
        GraphDriver: GraphDriver;
        Mounts: Mount[];
        Config: Partial<Config>;
        NetworkSettings: NetworkSettings;
    }

    export interface Config {
        Hostname: string;
        Domainname: string;
        User: string;
        AttachStdin: boolean;
        AttachStdout: boolean;
        AttachStderr: boolean;
        ExposedPorts: ExposedPorts;
        Tty: boolean;
        OpenStdin: boolean;
        StdinOnce: boolean;
        Env: string[];
        Cmd: string[];
        Image: string;
        Volumes: null;
        WorkingDir: string;
        Entrypoint: string[];
        OnBuild: null;
        Labels: Labels;
        StopSignal: string;
    }

    export interface ExposedPorts {
        "80/tcp": The80_TCP;
    }

    export interface The80_TCP {
    }

    export interface Labels {
        maintainer: string;
        "traefik.backend": string;
        "traefik.docker.network": string;
        "traefik.enable": string;
        "traefik.frontend.entryPoints": string;
        "traefik.port": string;
    }

    export interface GraphDriver {
        Data: Data;
        Name: string;
    }

    export interface Data {
        LowerDir: string;
        MergedDir: string;
        UpperDir: string;
        WorkDir: string;
    }

    export interface HostConfig {
        Binds: string[];
        ContainerIDFile: string;
        LogConfig: LogConfig;
        NetworkMode: string;
        PortBindings: Port;
        RestartPolicy: RestartPolicy;
        AutoRemove: boolean;
        VolumeDriver: string;
        VolumesFrom: null;
        CapAdd: null;
        CapDrop: null;
        CgroupnsMode: string;
        Dns: any[];
        DnsOptions: any[];
        DnsSearch: any[];
        ExtraHosts: null;
        GroupAdd: null;
        IpcMode: string;
        Cgroup: string;
        Links: null;
        OomScoreAdj: number;
        PidMode: string;
        Privileged: boolean;
        PublishAllPorts: boolean;
        ReadonlyRootfs: boolean;
        SecurityOpt: null;
        UTSMode: string;
        UsernsMode: string;
        ShmSize: number;
        Runtime: string;
        ConsoleSize: number[];
        Isolation: string;
        CpuShares: number;
        Memory: number;
        NanoCpus: number;
        CgroupParent: string;
        BlkioWeight: number;
        BlkioWeightDevice: any[];
        BlkioDeviceReadBps: null;
        BlkioDeviceWriteBps: null;
        BlkioDeviceReadIOps: null;
        BlkioDeviceWriteIOps: null;
        CpuPeriod: number;
        CpuQuota: number;
        CpuRealtimePeriod: number;
        CpuRealtimeRuntime: number;
        CpusetCpus: string;
        CpusetMems: string;
        Devices: any[];
        DeviceCgroupRules: null;
        DeviceRequests: null;
        KernelMemory: number;
        KernelMemoryTCP: number;
        MemoryReservation: number;
        MemorySwap: number;
        MemorySwappiness: null;
        OomKillDisable: boolean;
        PidsLimit: null;
        Ulimits: null;
        CpuCount: number;
        CpuPercent: number;
        IOMaximumIOps: number;
        IOMaximumBandwidth: number;
        MaskedPaths: string[];
        ReadonlyPaths: string[];
    }

    export interface LogConfig {
        Type: string;
        Config: The80_TCP;
    }

    export interface Port {
        "80/tcp": The80TCP[];
    }

    export interface The80TCP {
        HostIp: string;
        HostPort: string;
    }

    export interface RestartPolicy {
        Name: string;
        MaximumRetryCount: number;
    }

    export interface Mount {
        Type?: string;
        Source: string;
        Destination: string;
        Mode?: string;
        RW?: boolean;
        Propagation?: string;
    }

    export interface NetworkSettings {
        Bridge: string;
        SandboxID: string;
        HairpinMode: boolean;
        LinkLocalIPv6Address: string;
        LinkLocalIPv6PrefixLen: number;
        Ports: Port;
        SandboxKey: string;
        SecondaryIPAddresses: null;
        SecondaryIPv6Addresses: null;
        EndpointID: string;
        Gateway: string;
        GlobalIPv6Address: string;
        GlobalIPv6PrefixLen: number;
        IPAddress: string;
        IPPrefixLen: number;
        IPv6Gateway: string;
        MacAddress: string;
        Networks: Networks;
    }

    export interface Networks {
        bridge: Bridge;
    }

    export interface Bridge {
        IPAMConfig: null;
        Links: null;
        Aliases: null;
        NetworkID: string;
        EndpointID: string;
        Gateway: string;
        IPAddress: string;
        IPPrefixLen: number;
        IPv6Gateway: string;
        GlobalIPv6Address: string;
        GlobalIPv6PrefixLen: number;
        MacAddress: string;
        DriverOpts: null;
    }

    export interface State {
        Status: string;
        Running: boolean;
        Paused: boolean;
        Restarting: boolean;
        OOMKilled: boolean;
        Dead: boolean;
        Pid: number;
        ExitCode: number;
        Error: string;
        StartedAt: string;
        FinishedAt: string;
    }


}