import { InstitutionModel, InstitutionApiResponseModel } from '../../data/model/institution.model';

let institutionListData: InstitutionApiResponseModel;
let addNewInstitutionInfoData: InstitutionModel;
let addInstitutionActiveTabName: string;
export class InstitutionData {
    public InstitutionListData = {
        get value(): InstitutionApiResponseModel {
            return institutionListData;
        },
        set value(v: InstitutionApiResponseModel) {
            institutionListData = v;
        }
    };
     public AddNewInstitutiontData = {
        get value(): InstitutionModel {
            return addNewInstitutionInfoData;
        },
        set value(v: InstitutionModel) {
            addNewInstitutionInfoData = v;
        },
        get activeTabName(): string {
            return addInstitutionActiveTabName;
        },
        set activeTabName(v: string) {
            addInstitutionActiveTabName = v;
        }
     };
}
