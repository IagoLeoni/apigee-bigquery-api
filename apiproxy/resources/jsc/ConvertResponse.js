var bqResponse = context.getVariable("response.content");
var entityName = context.getVariable("proxy.basepath").replace("/", "");

var responseObject = {};

responseObject[entityName] = ConvertBigQueryResponse(JSON.parse(bqResponse));

context.setVariable("response.content", JSON.stringify(responseObject));

function ConvertBigQueryResponse(inputObject) {
    var result = [];
    for (var rowKey in inputObject.rows) {
        var row = inputObject.rows[rowKey];
        var newRow = {};
        for (var valueKey in row.f) {
            var value = row.f[valueKey];
            newRow[inputObject.schema.fields[valueKey].name] = value.v;
        }
        result.push(newRow);
    }
    return result;
}