from fpdf import FPDF
import random

class PDF(FPDF):

    def header(self):

        self.set_fill_color(5,5,5)

        self.rect(0,0,220,20,"F")

        self.set_text_color(0,255,100)

        self.set_font("Courier","B",22)

        self.cell(
            0,
            15,
            "ALIBI OS DOSSIER",
            ln=True,
            align="C"
        )

def create_report(data):

    pdf = PDF()

    pdf.add_page()

    pdf.set_fill_color(2,8,25)

    pdf.rect(0,20,220,300,"F")

    pdf.set_text_color(0,255,120)

    pdf.set_font("Courier","B",16)

    case_id = random.randint(1000,9999)

    pdf.ln(20)

    pdf.cell(
        0,
        10,
        f"CASE ID: AOS-{case_id}",
        ln=True
    )

    sections = [

        ("ASSIGNMENT",
        data["assignment"]),

        ("DEADLINE",
        data["deadline"]),

        ("THREAT LEVEL",
        "CRITICAL"),

        ("SURVIVAL CHANCE",
        "84%"),

        ("PARENT CALL RISK",
        "HIGH"),

        ("STATUS",
        "ACADEMICALLY ENDANGERED")
    ]

    for title,content in sections:

        pdf.ln(5)

        pdf.set_font("Courier","B",14)

        pdf.cell(
            0,
            10,
            title,
            ln=True
        )

        pdf.set_font("Courier","",12)

        pdf.multi_cell(
            0,
            8,
            str(content)
        )

    pdf.ln(10)

    pdf.set_text_color(255,50,50)

    pdf.set_font("Courier","B",24)

    pdf.cell(
        0,
        15,
        "CLASSIFIED",
        ln=True,
        align="C"
    )

    filename = f"report_{case_id}.pdf"

    pdf.output(filename)

    return filename