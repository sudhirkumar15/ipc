import { SiteModel, SiteApiResponseModel } from '../model/site.model';

let siteListData: SiteApiResponseModel;
let addNewSiteInfoPostData: SiteModel;
let addNewSiteAdminPostData: SiteModel;
let addSiteActiveTabName: string;

export class SiteData {
    public SiteListData = {
        get value(): SiteApiResponseModel {
            return siteListData;
        },
        set value(v: SiteApiResponseModel) {
            siteListData = v;
        }
    };

    public AddNewSitePostData = {
        get value(): SiteModel {
            return addNewSiteInfoPostData;
        },
        set value(v: SiteModel) {
            addNewSiteInfoPostData = v;
        },
        get activeTabName(): string {
            return addSiteActiveTabName;
        },
        set activeTabName(v: string) {
            addSiteActiveTabName = v;
        }

    };

    public AddNewSiteAdminPostData = {
        get value(): SiteModel {
            return addNewSiteAdminPostData;
        },
        set value(v: SiteModel) {
            addNewSiteAdminPostData = v;
        }
    };
}

