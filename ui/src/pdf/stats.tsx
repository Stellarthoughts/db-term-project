import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Font } from '@react-pdf/renderer';
import { Stats } from '../types/dbtypes';

Font.register({
	family: "Roboto",
	src:
		"https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});

// Create styles
const styles = StyleSheet.create({
	title: {
		margin: 20,
		fontSize: 25,
		textAlign: 'center',
		backgroundColor: '#e4e4e4',
		textTransform: 'uppercase',
		fontFamily: "Roboto"
	},
	body: {
		flexGrow: 1,
	},
	row: {
		flexGrow: 1,
		flexDirection: 'row',
	},
	block: {
		flexGrow: 1,
	},
	text: {
		width: '60%',
		margin: 10,
		textAlign: 'justify',
		fontFamily: "Roboto"
	},
	textLarge: {
		width: '60%',
		margin: 10,
		textAlign: 'center',
		fontFamily: "Roboto",
		fontSize: 40
	},
	fill1: {
		flexGrow: 2,
		color: "white",
		backgroundColor: '#3f51b5',
	},
	fill2: {
		flexGrow: 2,
		backgroundColor: '#757de8',
	},
	fill3: {
		flexGrow: 2,
		color: "white",
		backgroundColor: '#002984',
	},
	fill4: {
		flexGrow: 2,
		color: "white",
		backgroundColor: '#3f51b5',
	},
	fill5: {
		flexGrow: 2,
		backgroundColor: '#757de8',
	},
	tableContainer: {
		flexGrow: 1,
		margin: 20,
		marginTop: 0,
	}
});

// Create Document Component
export const StatsPDF = ({ stats }: { stats: Stats }) => (
	<Document>
		<Page size="A4">
			<View style={styles.body}>
				<Text style={styles.title}>
					Статистика
				</Text>
				<View style={styles.tableContainer}>
					<View style={styles.row}>
						<View style={styles.fill1}>
							<Text style={styles.text}>
								Количество участников:
							</Text>
							<Text style={styles.textLarge}>
								{stats.userCount}
							</Text>
						</View>
						<View style={styles.fill2}>
							<Text style={styles.text}>
								Количество книг:
							</Text>
							<Text style={styles.textLarge}>
								{stats.entryCount}
							</Text>
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.fill3}>
							<Text style={styles.text}>
								Количество глав:
							</Text>
							<Text style={styles.textLarge}>
								{stats.chapterCount}
							</Text>
						</View>
						<View style={styles.fill4}>
							<Text style={styles.text}>
								Количество страниц:
							</Text>
							<Text style={styles.textLarge}>
								{stats.pageCount}
							</Text>
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.fill5}>
							<Text style={styles.text}>
								Количество тредов:
							</Text>
							<Text style={styles.textLarge}>
								{stats.threadCount}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</Page>
	</Document>
);

