const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    console.log('asdasdasdasd', event);
    let bucketName = 'js-image-lambda'
    let key = 'images.json';
    
    let imageName = event.Records[0].s3.object.key;
    let imageSize = event.Records[0].s3.object.size;
    
    let stringBuffer = await s3.getObject({Bucket: bucketName, Key: key}).promise();
    console.log('stringBuffer', stringBuffer);
    let stringedData = stringBuffer.Body.toString();
    let parsedData =  JSON.parse(stringedData);
    // console.log('parsed data:', parsedData);
    
    let newImageDetails = {
        name: imageName,
        size: imageSize,
        type: 'jpg'
    };
    parsedData.push(newImageDetails);
    
    const params = {
        Bucket: 'js-image-lambda',
        Key: 'images.json',
        Body: JSON.stringify(parsedData),
        ContentType: 'application/json',
    };
    
    let anotherResponse = await s3.putObject(params).promise();
    console.log('response:', anotherResponse);
    
    
    
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('lambda function worked!'),
    };
    return response;
};
