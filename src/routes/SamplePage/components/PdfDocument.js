import React from 'react';
import {Document, Page, Text, View, StyleSheet, Image, Link} from '@react-pdf/renderer';
import logo from './../../../assets/images/infpromo-logo-black.png'

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  logoCenter: {
    width: 70,
    height: 70,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  logo: {
    width: 110,
    marginBottom: 30
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  box: {
    width: '33.3%',
    height: 120,
    backgroundColor: '#ddd',
    border: '1px solid #ff0000',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  between: {
    justifyContent: 'space-between'
  },
  center: {
    alignItems: 'center',
  }
});

// Create Document Component
const PdfDocument = ({data}) => {

  if (data === null) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>PDF Yaratılamadı.</Text>
          </View>
        </Page>
      </Document>
    )
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.row, styles.between, styles.center]}>
          <Image style={styles.logo} src={logo}/>
        </View>
        <View style={[styles.column, {alignItems: 'center', justifyContent: 'center'}]}>
          <Image style={[styles.logoCenter, {marginBottom: 20}]} src={data.profile.picture}/>
          <Text style={{fontSize: 20}}>{data.profile.fullname}</Text>
          <Link style={{marginBottom: 10}} src={data.profile.url} target={"_blank"}>{data.profile.username}</Link>
        </View>
        <View style={styles.row}>
          <View style={[styles.box, styles.column]}>
            <Text>
              {data.profile.followers}
            </Text>
          </View>
          <View style={[styles.box, styles.column]}>
            <Text>
              {data.profile.engagements}
            </Text>
          </View>
          <View style={[styles.box, styles.column]}>
            <Text>
              {data.profile.engagementRate}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
};

export default PdfDocument;
