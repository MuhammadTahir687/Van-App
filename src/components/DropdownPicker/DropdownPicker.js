import React, { useEffect, useState } from 'react'
import { StatusBar, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { styles } from './style';
import { Colors } from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Languages from '../../constants/Localization/localization';

const DropdownPicker = ({data,open,setOpen,value,setValue,onChangeValue,placeholder,listMode,multiple}) => {
    return (
        <DropDownPicker
            multiple={multiple}
            placeholder={placeholder}
            searchable={false}
            listMode={listMode}
            modalTitle="Select an Amenities"
            open={open}
            value={value}
            items={data}
            setOpen={setOpen}
            setValue={setValue}
            onChangeValue={onChangeValue}
            placeholderStyle={{ color: Colors.PrimaryColor }}
            dropDownDirection="BOTTOM"
            ArrowDownIconComponent={() => {
                return (
                    <FontAwesome
                        color={Colors.PrimaryColor}
                        style={{ paddingHorizontal: 5 }}
                        name="chevron-down"
                    />
                );
            }}
            ArrowUpIconComponent={() => {
                return (
                    <FontAwesome
                        color={Colors.PrimaryColor}
                        style={{ paddingHorizontal: 5 }}
                        name="chevron-up"
                    />
                );
            }}

            TickIconComponent={() => {
                return (
                    <FontAwesome
                        color={Colors.PrimaryColor}
                        style={{ paddingHorizontal: 5 }}
                        name="check"
                    />
                );
            }}
            arrowIconStyle={{ color: Colors.PrimaryColor }}
            listItemLabelStyle={{ color: Colors.PrimaryColor }}
            labelStyle={{ color: Colors.PrimaryColor }}
            style={{ borderColor: Colors.PrimaryColor,borderRadius:10 }}
            dropDownContainerStyle={{ borderColor: Colors.PrimaryColor }}
            modalTitleStyle={{color: Colors.PrimaryColor}}

        />
    )
}

export default DropdownPicker