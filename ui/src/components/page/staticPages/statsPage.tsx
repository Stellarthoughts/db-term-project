import Box from "@mui/material/Box"
import { useLoaderData } from "react-router-dom"
import { Stats } from "../../../types/dbtypes"
import { PDFViewer } from '@react-pdf/renderer';
import { StatsPDF } from "../../../pdf/stats";

function StatsPage() {
	const data = useLoaderData() as Stats

	return (
		<Box>
			<PDFViewer style={{ width: "100%", height: "900px" }}>
				<StatsPDF stats={data} />
			</PDFViewer>
		</Box>
	)
}

export default StatsPage
