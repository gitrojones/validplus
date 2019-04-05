export interface ValidationLifecycle {
    Valid: {
        Message?: string;
        CB?: Array<(VPAny?: any) => null>;
    };
    Invalid: {
        Message?: string;
        CB?: Array<() => null>;
    };
}
