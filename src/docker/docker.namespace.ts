namespace Docker {
  export interface Image {
    Id: string;
    ParentId: string;
    RepoTags: string[];
    RepoDigests: string[];
    Created: number;
    Size: number;
    VirtualSize: number;
    SharedSize: number;
    Labels: any;
    Containers: number;
  }

  export interface Container {
    Hostname: string;
    DomainName: string;
    User: string;
    AttachStdin: boolean;
    AttachStdout: boolean;
    AttachStderr: boolean;
    Tty: boolean;
    OpenStdin: boolean;
    StdinOnce: boolean;
    Env: string[];
    Cmd: string[];
    EntryPoint: string;
    Image: string;
    Labels: Labels;
    Volumes: Volumes;
    WorkingDir: string;
    NetworkDisabled: boolean;
    MacAddress: string;
    ExposedPorts: ExposedPorts;
    StopSignal: string;
    StopTimeout: number;
    HostConfig: Partial<HostConfig>;
    NetworkingConfig: NetworkingConfig;
  }

  export interface ExposedPorts {
    [key: string]: any;
  }

  export interface HostConfig {
    Binds: string[];
    Links: string[];
    Memory: number;
    MemorySwap: number;
    MemoryReservation: number;
    KernelMemory: number;
    NanoCPUs: number;
    CpuPercent: number;
    CpuShares: number;
    CpuPeriod: number;
    CpuRealtimePeriod: number;
    CpuRealtimeRuntime: number;
    CpuQuota: number;
    CpusetCpus: string;
    CpusetMems: string;
    MaximumIOps: number;
    MaximumIOBps: number;
    BlkioWeight: number;
    DeviceRequests: DeviceRequest[];
    MemorySwappiness: number;
    OomKillDisable: boolean;
    OomScoreAdj: number;
    PidMode: string;
    PidsLimit: number;
    PortBindings: PortBindings;
    PublishAllPorts: boolean;
    Privileged: boolean;
    ReadonlyRootfs: boolean;
    Dns: string[];
    DnsOptions: string[];
    DnsSearch: string[];
    VolumesFrom: string[];
    CapAdd: string[];
    CapDrop: string[];
    GroupAdd: string[];
    RestartPolicy: RestartPolicy;
    AutoRemove: boolean;
    NetworkMode: string;
    Devices: any[];
    LogConfig: LogConfig;
    SecurityOpt: any[];
    CgroupParent: string;
    VolumeDriver: string;
    ShmSize: number;
  }

  export interface DeviceRequest {
    Driver: string;
    Count: number;
    Capabilities: Array<string[]>;
    Options: Options;
  }

  export interface Options {
    property1: string;
    property2: string;
  }

  export interface LogConfig {
    Type: string;
    Config: any;
  }

  export interface PortBindings {
    [key: string]: { HostPort: string };
  }

  export interface RestartPolicy {
    Name: string;
    MaximumRetryCount?: number;
  }

  export interface Labels {
    'com.example.vendor': string;
    'com.example.license': string;
    'com.example.version': string;
  }

  export interface NetworkingConfig {
    EndpointsConfig: EndpointsConfig;
  }

  export interface EndpointsConfig {
    isolated_nw: IsolatedNw;
  }

  export interface IsolatedNw {
    IPAMConfig: IPAMConfig;
    Links: string[];
    Aliases: string[];
  }

  export interface IPAMConfig {
    IPv4Address: string;
    IPv6Address: string;
    LinkLocalIPs: string[];
  }

  export interface Volumes {
    '/volumes/data': any;
  }
}
