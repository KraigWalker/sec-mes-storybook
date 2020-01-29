
export default class ConfigUtils {
    static config = {};
    static getConfig = (startApp) => {
        fetch(`/config.json`)
            .then((response) => (
                response.json()
            )).then((data) => {
                ConfigUtils.config = data;
                startApp();
            });
    }
}
