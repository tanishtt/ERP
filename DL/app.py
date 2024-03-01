from flask import Flask, request, jsonify
from your_model import transcribe_audio_chunk  # Import function to transcribe audio chunk

app = Flask(__name__)

@app.route('/stream-transcribe', methods=['POST'])
def stream_transcribe():
    try:
        audio_chunk = request.data  # Audio chunk data
        partial_transcript = transcribe_audio_chunk(audio_chunk);
        
        
        return jsonify({'partialTranscript': partial_transcript})
    except Exception as e:
        print('Error streaming transcription:', e)
        return jsonify({'error': 'An error occurred while streaming transcription'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
