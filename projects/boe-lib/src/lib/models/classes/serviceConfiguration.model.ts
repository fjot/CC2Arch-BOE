export class ServiceConfiguration {
    moduleName: string;
    serviceName: string;
    classifiableType: string;

    constructor(moduleName: string, serviceName: string, classifiableType: string){
        this.moduleName = moduleName;
        this.serviceName = serviceName;
        this.classifiableType = classifiableType;
    }
}
