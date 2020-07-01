export interface primeReachabilityResponse {
    '@last': number;
    '@first': number;
    '@type': string;
    '@count': number;
    entityId: reachabilityEntityId[]
}

export interface reachabilityEntityId {
    '@type': string;
    '@url': string;
    '$': string;
}

export class primeResponse {
    reachable: primeReachabilityResponse;
    unreachable: primeReachabilityResponse;
    unreachableDevices?: DevicesDTO[]
}

export interface QueryResponse {
    "@type": string;
    "@domain": string;
    "@requestUrl": string;
    "@responseType": string;
    "@rootUrl": string;
    entity: Entity[];
}

export interface Entity {
    "@dtoType": string;
    "@type": string;
    "@url": string;
    devicesDTO: DevicesDTO;
}

export interface DevicesDTO {
    "@displayName": string;
    "@id": number;
    adminStatus: string;
    collectionDetail: string;
    collectionStatus: string;
    collectionTime: Date;
    creationTime: Date;
    deviceId: number;
    deviceName: string;
    deviceType: string;
    ipAddress: string;
    managementStatus: string;
    manufacturerPartNrs: ManufacturerPartNrs;
    productFamily: string;
    reachability: string;
    softwareType: string;
    softwareVersion: string;
}

export interface ManufacturerPartNrs {
    manufacturerPartNr: ManufacturerPartNr[];
}

export interface ManufacturerPartNr {
    name: string;
    partNumber: string;
    serialNumber: string;
}
