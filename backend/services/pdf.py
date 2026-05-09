from fpdf import FPDF
import random


def create_report(data):

    pdf = FPDF()

    pdf.add_page()

    pdf.set_fill_color(20, 20, 20)

    pdf.set_text_color(0, 255, 70)

    pdf.set_font("Courier", "B", 18)

    pdf.cell(190, 12, "ACADEMIC INCIDENT REPORT", ln=True)

    pdf.ln(10)

    pdf.set_font("Courier", size=12)

    case_id = random.randint(1000, 9999)

    pdf.multi_cell(
        0,
        8,
        f"""
CASE ID: AOS-{case_id}

ASSIGNMENT:
{data['assignment']}

DEADLINE:
{data['deadline']}

SITUATION:
{data['situation']}

THREAT ANALYSIS:
Elevated emotional manipulation detected.

RECOMMENDATION:
Deadline extension recommended.

STATUS:
CHAOTIC NEUTRAL
        """
    )

    file_name = f"report_{case_id}.pdf"

    pdf.output(file_name)

    return file_name