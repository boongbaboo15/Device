import { BrandsInterface } from "./IBrand";
import { DistributorsInterface } from "./IDistributor";
import { TypesInterface } from "./IType";

export interface DevicesInterface {
    ID?: number,
    Name?: string;
    Type?: TypesInterface;
    TypeID?: number;
    Brand?: BrandsInterface;
    BrandID?: number;
    Distributor?: DistributorsInterface;
    DistributorID?: number;
   }