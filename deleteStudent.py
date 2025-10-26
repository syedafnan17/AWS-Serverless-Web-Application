import json
import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-3')
    table = dynamodb.Table('studentData')

    try:
        # Get studentid from query string (e.g., ?studentid=123)
        studentid = event['queryStringParameters']['studentid']

        # Delete item from DynamoDB
        table.delete_item(
            Key={'studentid': studentid}
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': f'Student {studentid} deleted successfully'})
        }

    except Exception as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)})
        }
