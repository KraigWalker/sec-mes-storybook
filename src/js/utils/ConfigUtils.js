
export default class ConfigUtils {
    static config = {};
    static getConfig = (startApp) => {
        fetch(`${window.pathValue}/_config/config.env.json`)
            .then((response) => (
                response.json()
            )).then((data) => {
                ConfigUtils.config = data;
                startApp();
            });
    }
}
