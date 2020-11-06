import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class BookedTransactionsScreen extends Component {
  constructor(){
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal'
    }
  }
  getCameraPermissions= async()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions: status === 'granted',
      buttonState: 'clicked',
      scanned: false
    })
  }
  handleBarcodeScanned= async({type,data})=>{
    this.setState({
      scannedData: data,
      scanned: true,
      buttonState: 'normal'
    })
  }
  render(){
    const hasCameraPermissions = this.state.hasCameraPermissions
    const scanned = this.state.scanned
    const buttonState = this.state.buttonState
    if(buttonState==='clicked' && hasCameraPermissions){
      return (
        <BarCodeScanner 
          onBarCodeScanned = {scanned? undefined: this.handleBarcodeScanned}
          style = {StyleSheet.absoluteFillObject}
        />
      )
    }
    else if(buttonState === 'normal'){

  return (
    <View>
      <Text> {hasCameraPermissions === true? this.state.scannedData
        :'Request Camera Permissions'}
         </Text>
      <TouchableOpacity style={styles.scanButton}
      onPress = {this.getCameraPermissions}> <Text> Scan QR/Bar Code </Text> </TouchableOpacity>
    </View>
  )}
}
}
const styles = StyleSheet.create({
  scanButton: {
    backgroundColor: 'orange',
    margin: 10,
    borderRadius: 25
  }
})