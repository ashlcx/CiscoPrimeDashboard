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
}