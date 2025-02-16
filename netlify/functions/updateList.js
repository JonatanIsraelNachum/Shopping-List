exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    let data = JSON.parse(event.body);
    global.shoppingList = data.list;
    
    return { statusCode: 200, body: JSON.stringify({ message: "List updated successfully" }) };
};
