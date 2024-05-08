import React from "react";
import { Page, Text, Document, StyleSheet, View, Font } from "@react-pdf/renderer";


Font.register({
    family: 'Spirax',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/spirax/v21/buE3poKgYNLy0F3cXktt-Csn-Q.ttf' },
        {
            src: 'https://fonts.gstatic.com/s/spirax/v21/buE3poKgYNLy0F3cXktt-Csn-Q.ttf',
            fontWeight: 'bold',
        },
        {
            src: 'https://fonts.gstatic.com/s/spirax/v21/buE3poKgYNLy0F3cXktt-Csn-Q.ttf',
            fontWeight: 'normal',
            fontStyle: 'italic',
        },
    ]
});
Font.register({
    family: 'Chivo',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_vB_ul2DSFXjQiQ.ttf' },
        {
            src: 'https://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFwG1GrWN33AiasJ.ttf',
            fontWeight: 'normal',
            fontStyle: 'italic',
        },
    ]
});

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#e4fdf8",
    },
    logo: {
        marginTop: 20,
        marginLeft: 80,
        padding: 5,
        position: "absolute",
        fontSize: 21,
        backgroundColor: "#e4fdf8",
        borderRadius: 10,
    },
    report: {
        paddingTop: 30,
        paddingLeft: 590,
        position: "absolute",
        fontFamily: "Chivo",
        fontSize: 14,
    },
    period: {
        paddingTop: 50,
        paddingLeft: 550,
        position: "absolute",
        fontFamily: "Chivo",
        fontSize: 12,
    },

    title: {
        fontSize: 16,
        textAlign: "center",
        paddingTop: 73,
        marginBottom: 10,
        fontFamily: "Chivo",
    },
    table: {
        tableLayout: "fixed",
        marginHorizontal: "auto",
        marginTop: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",// This makes the row act like a grid container
    },
    tableHeader: {
        marginLeft: "2px",
        marginBottom: "2px",
        borderStyle: "solid",
        borderColor: "#000000",
        padding: 5,
        fontSize: 12,
        width: "90px",
        height: "32px",
        backgroundColor: "#206A5E",
        color: "#000",
        textAlign: "center",
        fontFamily: "Chivo",
    },
    cell: {
        marginLeft: "2px",
        marginBottom: "2px",
        borderStyle: "solid",
        borderColor: "#000000",
        padding: 5,
        fontSize: 12,
        width: "90px",
        height: "100px",
        backgroundColor: "#bdeedc",
    },
    image: {
        marginLeft: "2px",
        marginBottom: "2px",
        borderStyle: "solid",
        borderColor: "#000000",
        backgroundColor: "#FBF3D5",
        padding: 5,
        fontSize: 12,
        width: "170px",
        height: "100px",
        paddingHorizontal: "55px",
        paddingVertical: "10px",
    },
});

const RoomReport = ({ items }) => {
    // Function to split items into chunks of 4
    const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );

    // Split items into chunks of 4
    const itemChunks = chunk(items, 4);

    return (
        <Document>
            {itemChunks.map((items, index) => (
                <Page key={index} size="A4" orientation="landscape" style={styles.page}>
                    <Text style={styles.logo}>Hotel Heritage</Text>

                    <Text style={styles.report}>Monthly Report</Text>
                    <Text style={styles.period}>For the period ended {new Date().toLocaleDateString()}</Text>
                    <Text style={styles.title}>Rooms Table</Text>
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={styles.tableHeader}>RoomID</Text>
                            <Text style={styles.tableHeader}>Room Name</Text>
                            <Text style={styles.tableHeader}>RentPerNight</Text>
                            <Text style={styles.tableHeader}>No.Of beds</Text>
                            <Text style={styles.tableHeader}>Room Type</Text>
                            <Text style={styles.tableHeader}>AC Availability</Text>
                            <Text style={styles.tableHeader}>Wifi Availability</Text>
                            <Text style={styles.tableHeader}>Description</Text>
                        </View>
                        {items.map((item) => (
                            <View key={item._id} style={styles.row}>
                                <Text style={styles.cell}>{item._id}</Text>
                                <Text style={styles.cell}>{item.name}</Text>
                                <Text style={styles.cell}>{item.rentPerNight}</Text>
                                <Text style={styles.cell}>{item.numberOfBeds}</Text>
                                <Text style={styles.cell}>{item.roomType}</Text>
                                <Text style={styles.cell}>{item.acAvailability ? "Available" : "Not Available"}</Text>
                                <Text style={styles.cell}>{item.wifiAvailability ? "Available" : "Not Available"}</Text>
                                <Text style={styles.cell}>{item.roomDescription}</Text>
                            </View>
                        ))}
                    </View>
                </Page>
            ))}
        </Document>
    );
};

export default RoomReport;
