import json
from io import StringIO

import altair as alt
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pandas import DataFrame

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    """API動作確認用に単なるメッセージを返す."""
    return {"message": "Hello World"}


@app.get("/simple-line")
def simple_line():
    """sin波を作成してvega-liteのjson形式で返す."""
    x = np.arange(100)
    df = DataFrame({"x": x, "y": np.sin(x / 5)})
    chart = alt.Chart(df).mark_line().encode(x="x", y="y")

    buff = StringIO()
    chart.save(buff, format="json")

    return json.loads(buff.getvalue())
