import moment from "moment/moment";

export const dateFormat = (str, format = 'YYYY-MM-DD HH:mm:ss') => moment(str).format(format)
