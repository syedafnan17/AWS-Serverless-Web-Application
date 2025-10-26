import json
import boto3
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-3')
    table = dynamodb.Table('studentData')

    try:
        body = json.loads(event['body'])

        studentid = body['studentid']
        name = body.get('name')
        student_class = body.get('class')
        age = body.get('age')

        # Update the item in DynamoDB
        response = table.update_item(
            Key={'studentid': studentid},
            UpdateExpression="set #n = :n, #c = :c, #a = :a",
            ExpressionAttributeNames={
                '#n': 'name',
                '#c': 'class',
                '#a': 'age'
            },
            ExpressionAttributeValues={
                ':n': name,
                ':c': student_class,
                ':a': age
            },
            ReturnValues="UPDATED_NEW"
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Student updated successfully', 'updated': response['Attributes']})
        }

    except Exception as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)})
        }
