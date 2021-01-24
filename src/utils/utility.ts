import moment from "moment";

class Utility {

    parseSchemeDate(dateString: string) {
        let mom = moment(dateString, 'DD-MM-YYYY')
        return mom.format("D MMM, YY, ddd")
    }
}

export default new Utility()