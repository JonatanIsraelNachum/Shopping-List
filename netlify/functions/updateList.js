exports.handler = async function(event) {
    // תמיכה בבקשות OPTIONS (למניעת בעיות CORS)
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            body: "",
        };
    }

    // בקשת GET - מחזירה את הרשימה השמורה
    if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ list: global.shoppingList || [] }),
        };
    }

    // בקשת POST - מעדכנת את הרשימה
    if (event.httpMethod === "POST") {
        let data;
        try {
            data = JSON.parse(event.body);
        } catch (error) {
            return { statusCode: 400, body: "Invalid JSON" };
        }

        global.shoppingList = data.list || [];

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "List updated successfully" }),
        };
    }

    // אם מדובר בבקשה אחרת - החזר 405 (Method Not Allowed)
    return { statusCode: 405, body: "Method Not Allowed" };
};
