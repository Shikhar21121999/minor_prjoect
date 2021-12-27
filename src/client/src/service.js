const get_env = () => {
	if (process.env.NODE_ENV === 'development') {
		return "development"
	} else {
		return "production"
	}
}

const BASE_URL_MAP = {"development": "http://localhost:8000", "production": "xx"}
const BASE_APP_URL_MAP = {"development": "http://localhost:3000", "production": "yy"}

const BASE_URL = BASE_URL_MAP[get_env()]
export cconst get_env = () => {
	if (process.env.NODE_ENV === 'development') {
		return "development"
	} else {
		return "production"
	}
}

const BASE_URL_MAP = {"development": "http://localhost:8000", "production": "xx"}
const BASE_APP_URL_MAP = {"development": "http://localhost:3000", "production": "yy"}

const BASE_URL = BASE_URL_MAP[get_env()]
export const BASE_APP_URL = BASE_APP_URL_MAP[get_env()]

const getHeaders = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    return myHeaders;
}

export const getStockData = ({company}) => {
    var requestOptions = {
        method: 'GET',
        headers: getHeaders()
    };
    let params = '';
    params += company ? "&company=" + company : "";
    return fetch(BASE_URL + "/stock_prediction/?" + params, requestOptions)
            .then(handleResponse)
            .then(data => {
                return data;
            });
}

function handleResponse(response) {
    return response.text().then(text => {
        try {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    console.log("Status code 401")
                }
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        } catch (err) {
            return Promise.reject(err);
        }
    });
}