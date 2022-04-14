export default function parseJwt (token) {
    if(token) {
        var base64Url1 = token.split('.')[1];
        var base64Url2 = token.split('.')[2];
        var base64Url3 = token.split('.')[3];
        var base64 = base64Url1.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        console.log(base64)
        let jsonData = JSON.parse(jsonPayload);
        return jsonData;
    }
}