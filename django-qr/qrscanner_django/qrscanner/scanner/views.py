import cv2
import numpy as np
import base64
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Initialize QRCode detector
detector = cv2.QRCodeDetector()

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def scan(request):
    if request.method == 'POST':
        try:
            body_unicode = request.body.decode('utf-8')
            body_data = json.loads(body_unicode)
            data = body_data.get('image', '')

            if ',' not in data:
                return JsonResponse({'success': False, 'error': 'Invalid image format'})

            encoded_data = data.split(',')[1]

            # Decode base64 to bytes
            img_data = base64.b64decode(encoded_data)
            if not img_data:
                return JsonResponse({'success': False, 'error': 'Image data is empty'})

            # Convert to numpy array and decode image
            nparr = np.frombuffer(img_data, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            if img is None:
                return JsonResponse({'success': False, 'error': 'Image decoding failed'})

            qr_data, points, _ = detector.detectAndDecode(img)

            if qr_data:
                return JsonResponse({"success": True, "data": qr_data})
            return JsonResponse({"success": False, "data": None})
        
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})

    return JsonResponse({'success': False, 'error': 'Invalid request method'})
