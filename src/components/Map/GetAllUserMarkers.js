import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';

export default GetAllUserMarkers = async () => {

  axios.get('http://10.16.1.218:3000/markers')
    .then(markers => return markers)
    .catch(err => return err)
}
