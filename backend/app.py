from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import fitz  # PyMuPDF
from langchain_text_splitters import RecursiveCharacterTextSplitter
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

app = FastAPI()

# Allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global document chunks
document_chunks = []

@app.post("/upload_pdf/")
async def upload_pdf(file: UploadFile):
    global document_chunks
    pdf_document = fitz.open(stream=await file.read(), filetype="pdf")
    full_text = ""
    for page in pdf_document:
        full_text += page.get_text()

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    document_chunks = splitter.split_text(full_text)

    return {"message": "PDF uploaded successfully", "pages": len(pdf_document)}

@app.post("/ask_question/")
async def ask_question(question: str = Form(...)):
    global document_chunks
    if not document_chunks:
        return {"answer": "No PDF uploaded yet."}

    # Simple keyword retrieval (replace with embeddings for RAG)
    q_words = set(question.lower().split())
    relevant = []
    for chunk in document_chunks:
        c_words = set(chunk.lower().split())
        if not q_words.isdisjoint(c_words):
            relevant.append(chunk)

    context = "\n\n".join(relevant[:3])

    prompt = f"""
    You are a helpful AI assistant. Answer based only on this document context:

    Context:
    {context}

    Question: {question}

    Answer:
    """
    try:
        model = genai.GenerativeModel("gemini-1.5-flash-latest")
        response = model.generate_content(prompt)
        return {"answer": response.text}
    except Exception as e:
        return {"answer": f"Error: {str(e)}"}
