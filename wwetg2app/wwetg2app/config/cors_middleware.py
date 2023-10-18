from webob import Response

class CORSMiddleware:
    def __init__(self, app, origins):
        self.app = app
        self.origins = origins

    def __call__(self, environ, start_response):
        def custom_start_response(status, headers, exc_info=None):
            headers.append(('Access-Control-Allow-Origin', self.origins))
            headers.append(('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'))
            headers.append(('Access-Control-Allow-Headers', 'Content-Type,Authorization'))
            headers.append(('Access-Control-Allow-Credentials', 'true'))
            return start_response(status, headers, exc_info)
        
        if environ.get('REQUEST_METHOD') == 'OPTIONS':
            # Pre-flight request. Reply successfully:
            response = Response()
            response.headers.add('Access-Control-Allow-Origin', self.origins)
            response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
            response.headers.add('Access-Control-Allow-Credentials', 'true')
            response.status_code = 200
            return response(environ, custom_start_response)
        
        return self.app(environ, custom_start_response)
