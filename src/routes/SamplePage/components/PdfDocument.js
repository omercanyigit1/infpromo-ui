import React, {useRef} from 'react';
import {Document, Page, Text, View, StyleSheet, Image, Link, PDFViewer} from '@react-pdf/renderer';
import logo from './../../../assets/images/infpromo-logo-black.png'
import moment from 'moment';
import { Doughnut, Line } from 'react-chartjs-2';

function renderSwitch(param) {
  switch (param.length) {
    case 4:
      return `${param.substring(0, 1)},${param.substring(1, 2)}K`;
    case 5:
      return `${param.substring(0, 2)},${param.substring(2, 3)}K`;
    case 6:
      return `${param.substring(0, 3)},${param.substring(3, 4)}K`;
    case 7:
      return `${param.substring(0, 1)},${param.substring(1, 2)}M`;
    case 8:
      return `${param.substring(0, 2)},${param.substring(2, 3)}M`;
    case 9:
      return `${param.substring(0, 4)},${param.substring(3, 4)}M`;
    default:
      return `${param}`;
  }
}

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
    minHeight: 100,
    backgroundColor: '#ddd',
    border: '1px solid #ff0000',
    alignItems: 'center',
    justifyContent: 'center'
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
  let size = 3;
  const chartRef = useRef(null);

  const test = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774"
      }
    ]
  };

  const base64Image = chartRef.current.chartInstance.toBase64Image();

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
    <div>
      <Line data={test} ref={chartRef} />
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
          <View style={[styles.row, {marginBottom: 15}]}>
            <View style={[styles.box, styles.column]}>
              <Text>
                Takipci
              </Text>
              <Text>
                {renderSwitch(data.profile.followers.toString())}
              </Text>
            </View>
            <View style={[styles.box, styles.column]}>
              <Text>
                Toplam Etkilesim
              </Text>
              <Text>
                {data.profile.engagements.toString().substring(0, 3)} k
              </Text>
            </View>
            <View style={[styles.box, styles.column]}>
              <Text>
                Etkilesim Orani
              </Text>
              <Text>
                {parseFloat(parseFloat(data.profile.engagementRate) * 100).toFixed(2)} %
              </Text>
            </View>
          </View>
          <View style={[styles.row, {width: '100%'}]}>
            <Text>Populer Postlar</Text>
          </View>
          <View style={[styles.row, {marginTop: 15, marginBottom: 15}]}>
            {data.popularPosts && data.popularPosts.slice(0, size).map((item, index) => {
              return (
                <View key={`post-${index}`} style={[styles.box, styles.column, {padding: 10, marginBottom: 15, float: 'left'}]}>
                  <Text style={{marginBottom: 10}}>Tarih: {moment(item.created).format('ll')}</Text>
                  <Image src={`${item.thumbnail}`} style={{maxHeight: 150, width: '100%'}} />
                  <View style={[styles.row, {marginTop: 10}]}>
                    <Text>Begeni: {item.likes}</Text>
                    <Text>Yorum: {item.comments}</Text>
                  </View>
                </View>
              )
            })}
          </View>
          <View style={[styles.row, {marginBottom: 15}]}>
            <View style={{width: '70%'}}>
              <Image src={`${base64Image}`} style={{maxHeight: 150, width: '100%'}} />
            </View>
          </View>
        </Page>
      </Document>
    </div>
  )
};

export default PdfDocument;
