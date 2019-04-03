export interface ValidationLifecycle {
    Valid: {
        Message?: string;
        CB?: Array<() => null>;
    };
    Invalid: {
        Message?: string;
        CB?: Array<() => null>;
    };
}
