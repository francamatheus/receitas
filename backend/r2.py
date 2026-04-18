import boto3
import json
import os


def _client():
    return boto3.client(
        "s3",
        endpoint_url=os.environ["R2_ENDPOINT_URL"],
        aws_access_key_id=os.environ["R2_ACCESS_KEY"],
        aws_secret_access_key=os.environ["R2_SECRET_KEY"],
        region_name="auto",
    )


def r2_get(key: str):
    try:
        obj = _client().get_object(Bucket=os.environ["R2_BUCKET"], Key=key)
        return json.loads(obj["Body"].read().decode())
    except Exception:
        return None


def r2_put(key: str, content, content_type: str = "application/json"):
    body = json.dumps(content, ensure_ascii=False, indent=2).encode()
    _client().put_object(
        Bucket=os.environ["R2_BUCKET"],
        Key=key,
        Body=body,
        ContentType=content_type,
    )
