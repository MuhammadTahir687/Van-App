<View style={styles.inputContainer}>
    <FontAwesome5 name={"user-alt"} color={Colors.PrimaryColor} />
    <TextInput
        style={styles.textInput}
        placeholder={Languages.ba_signup_name}
        placeholderTextColor={Colors.PrimaryColor}
        value={name}
        onChangeText={(text) => { setName(text), setNameValidation("") }}
    />
</View>
{ nameValidation && <ErrorMessage error={nameValidation} /> }
<View style={styles.inputContainer}>
    <FontAwesome5 name={"mail-bulk"} color={Colors.PrimaryColor} />
    <TextInput
        style={styles.textInput}
        placeholder={Languages.ba_signup_email}
        keyboardType={"email-address"}
        placeholderTextColor={Colors.PrimaryColor}
        value={email}
        autoCapitalize='none'
        onChangeText={(text) => { setEmail(text), setEmailValidation("") }}

    />
</View>
{ emailValidation && <ErrorMessage error={emailValidation} /> }


<View style={styles.rowcontainer}>
<View style={{ flex: 1 }}>
    <CountryPickerModal
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        country={country}
        setCountry={setCountry}
        setCountryValidation={setCountryValidation}
    />
    {countryValidation && <ErrorMessage error={countryValidation} />}
</View>

<View style={{ flex: 1 }}>
    <View style={{ ...styles.rowinputcontainer, marginLeft: 5, flex: 0, height: 50 }}>
        <FontAwesome5 name={"globe-americas"} color={Colors.PrimaryColor} style={{ marginLeft: 5 }} />
        <TextInput
            style={styles.rowtextInput}
            placeholder={Languages.ba_signup_city}
            placeholderTextColor={Colors.PrimaryColor}
            value={city}
            onChangeText={(text) => { setCity(text) }}

        />
    </View>
</View>
</View>

<View style={styles.rowcontainer}>
<View style={{ ...styles.rowinputcontainer, marginRight: 10 }}>
    <FontAwesome5 name={"phone-alt"} color={Colors.PrimaryColor} style={{ marginLeft: 5 }} />
    <TextInput
        style={styles.rowtextInput}
        placeholder={Languages.ba_signup_phone}
        keyboardType={"numeric"}
        placeholderTextColor={Colors.PrimaryColor}
        value={phone}
        onChangeText={(text) => { setPhone(text) }}

    />
</View>
{value != 'Hotel Reservation' &&
    <View style={styles.rowinputcontainer}>
        <FontAwesome5 name={"user-alt"} color={Colors.PrimaryColor} style={{ marginLeft: 5 }} />
        <TextInput
            style={styles.rowtextInput}
            placeholder={Languages.ba_signup_age}
            placeholderTextColor={Colors.PrimaryColor}
            value={age}
            keyboardType={"numeric"}
            onChangeText={(text) => { setAge(text) }}
        />
    </View>
}
{value != null && value == 'Hotel Reservation' &&
    <View style={styles.rowinputcontainer}>
        <Fontisto name={"room"} color={Colors.PrimaryColor} style={{ marginLeft: 5 }} />
        <TextInput
            style={styles.rowtextInput}
            placeholder={Languages.ba_signup_hotel_rooms}
            keyboardType='numeric'
            placeholderTextColor={Colors.PrimaryColor}
            value={hotelRooms}
            onChangeText={(text) => { setHotelRooms(text) }}

        />
    </View>
}


</View>


{/************************Tour Guide*******************/ }
{/***********************Car Rental Guide*******************/ }
{
    value != null && value == "Car Rent" &&

    <>

        <View style={styles.inputContainer}>
            <FontAwesome5 name={"user"} color={Colors.PrimaryColor} />
            <TextInput
                style={styles.textInput}
                placeholder={"Enter Profile Picture Url"}
                placeholderTextColor={Colors.PrimaryColor}
                value={image}
                onChangeText={(text) => { setImage(text), setTaxiImageValidation("") }}

            />
        </View>
        <TouchableOpacity onPress={() => { setShowImage(true) }} style={{ backgroundColor: Colors.PrimaryColor, paddingHorizontal: 40, paddingVertical: 10, borderRadius: 10 }}>
            <Text style={{ color: Colors.WhiteColor }}>Load Image</Text>
        </TouchableOpacity>
        {showImage == true && image != "" && <Image source={{ uri: image }} style={{ width: 200, height: 200, margin: 10, borderRadius: 10 }} />}

        <View style={styles.inputContainer}>
            <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
            <TextInput
                style={styles.textInput}
                placeholder={"Agency Name"}
                placeholderTextColor={Colors.PrimaryColor}
                value={hotelName}
                onChangeText={(text) => { }}
            />
        </View>
        <View style={styles.inputContainer}>
            <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
            <TextInput
                style={styles.textInput}
                placeholder={"Agency Address"}
                placeholderTextColor={Colors.PrimaryColor}
                value={hotelName}
                onChangeText={(text) => { }}
            />
        </View>

        <View style={styles.descriptionbox}>
            <MaterialIcons name={"description"} size={15} color={Colors.PrimaryColor} style={styles.descriptionicon} />
            <TextInput
                style={styles.textbox}
                placeholder={"Brief Introduction"}
                underlineColorAndroid="transparent"
                multiline={true}
                numberOfLines={8}
                placeholderTextColor={Colors.PrimaryColor}
                value={taxiIntroduction}
                onChangeText={(text) => { }}

            />
        </View>
        {/* ==================Car Rent Image=================== */}
        <View style={styles.inputContainer}>
            <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
            <TextInput
                style={styles.textInput}
                placeholder={"Enter Images Url"}
                placeholderTextColor={Colors.PrimaryColor}
                value={hotelImages?.hotelImageValue}
                onChangeText={(text) => { setHotelImages({ ...hotelImages, hotelImage: text, hotelImageValue: text }) }}

            />
        </View>
        {imageListValidation && <ErrorMessage error={imageListValidation} />}

        <TouchableOpacity disabled={hotelImages?.hotelImageValue == "" ? true : false} onPress={() => { AddHotelImages() }} style={styles.loadImageBtn}>
            <Text style={{ color: Colors.WhiteColor }}>Load Image</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
            {hotelImages?.hotelImagesList?.length > 0 &&
                hotelImages?.hotelImagesList?.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity onPress={() => { RemoveHotelImage(item) }} style={styles.removeImageIcon}>
                            <Ionicons name={"close"} size={15} style={styles.closeIcon} />
                        </TouchableOpacity>
                        <Image source={{ uri: item?.url }} style={styles.hotelImages} />
                    </View>

                ))
            }
        </View>


    </>

}




{/************************Taxi*******************/ }

{
    value != null && value == "Taxi" &&
    <>

        <View style={styles.inputContainer}>
            <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
            <TextInput
                style={styles.textInput}
                placeholder={"Enter Image Url"}
                placeholderTextColor={Colors.PrimaryColor}
                value={image}
                onChangeText={(text) => { setImage(text), setTaxiImageValidation("") }}

            />
        </View>
        {taxiImageValidation && <ErrorMessage error={taxiImageValidation} />}

        <TouchableOpacity onPress={() => { setShowImage(true) }} style={{ backgroundColor: Colors.PrimaryColor, paddingHorizontal: 40, paddingVertical: 10, borderRadius: 10 }}>
            <Text style={{ color: Colors.WhiteColor }}>Load Image</Text>
        </TouchableOpacity>
        {showImage == true && image != "" && <Image source={{ uri: image }} style={{ width: 200, height: 200, margin: 10, borderRadius: 10 }} />}

        <View style={styles.inputContainer}>
            <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
            <TextInput
                style={styles.textInput}
                placeholder={Languages.ba_signup_taxi_model}
                placeholderTextColor={Colors.PrimaryColor}
                value={taxiModel}
                onChangeText={(text) => { setTaxiModel(text), setTaxiModelValidation("") }}

            />
        </View>
        {taxiModelValidation && <ErrorMessage error={taxiModelValidation} />}

        <View style={styles.inputContainer}>
            <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
            <TextInput
                style={styles.textInput}
                placeholder={"Currency"}
                placeholderTextColor={Colors.PrimaryColor}
                value={currency}
                onChangeText={(text) => { setCurrency(text), setCurrencyValidation("") }}

            />
        </View>
        {currencyValidation && <ErrorMessage error={currencyValidation} />}

        <View style={styles.inputContainer}>
            <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
            <TextInput
                style={styles.textInput}
                placeholder={Languages.ba_signup_taxi_hire_rate}
                placeholderTextColor={Colors.PrimaryColor}
                value={taxihireRate}
                keyboardType={'numeric'}
                onChangeText={(text) => { setTaxiHireRate(text), setTaxiHireRateValidation("") }}

            />
        </View>
        {taxiHireRateValidation && <ErrorMessage error={taxiHireRateValidation} />}

        <View style={styles.inputContainer}>
            <FontAwesome5 name={"car-side"} color={Colors.PrimaryColor} />
            <TextInput
                style={styles.textInput}
                placeholder={Languages.ba_signup_taxi_plate_number}
                placeholderTextColor={Colors.PrimaryColor}
                value={taxiPlateNumber}
                onChangeText={(text) => { settaxiPlateNumber(text), setTaxiPlateNumberValidation("") }}

            />
        </View>
        {taxiPlateNumberValidation && <ErrorMessage error={taxiPlateNumberValidation} />}

        <View style={styles.descriptionbox}>
            <MaterialIcons name={"description"} size={15} color={Colors.PrimaryColor} style={styles.descriptionicon} />
            <TextInput
                style={styles.textbox}
                placeholder={Languages.ba_signup_taxi_introduction}
                underlineColorAndroid="transparent"
                multiline={true}
                numberOfLines={8}
                placeholderTextColor={Colors.PrimaryColor}
                value={taxiIntroduction}
                onChangeText={(text) => { setTaxiIntroduction(text) }}

            />
        </View>
    </>
}

{/************************Hotel Reservation*******************/ }


{
    value != null && value == 'Hotel Reservation' &&
    <>
        <View style={styles.inputContainer}>
            <FontAwesome5 name={"building"} color={Colors.PrimaryColor} />
            <TextInput
                style={styles.textInput}
                placeholder={Languages.ba_signup_hotel_name}
                placeholderTextColor={Colors.PrimaryColor}
                value={hotelName}
                onChangeText={(text) => { setHotelName(text), setHotelNameValidation("") }}
            />
        </View>
        {hotelNameValidation && <ErrorMessage error={hotelNameValidation} />}

        <View style={styles.inputContainer}>
            <FontAwesome5 name={"globe-americas"} color={Colors.PrimaryColor} />
            <TextInput
                style={styles.textInput}
                placeholder={Languages.ba_signup_hotel_address}
                placeholderTextColor={Colors.PrimaryColor}
                value={hotelAddress}
                onChangeText={(text) => { setHotelAddress(text), setHotelAddressValidation("") }}
            />
        </View>
        {hotelAddressValidation && <ErrorMessage error={hotelAddressValidation} />}

        {/* ==================Hotel Image=================== */}
        <View style={styles.inputContainer}>
            <FontAwesome5 name={"globe-americas"} color={Colors.PrimaryColor} />
            <TextInput
                style={styles.textInput}
                placeholder={"Enter Image Url"}
                placeholderTextColor={Colors.PrimaryColor}
                value={hotelImages?.hotelImageValue}
                onChangeText={(text) => { setHotelImages({ ...hotelImages, hotelImage: text, hotelImageValue: text }) }}

            />
        </View>
        {imageListValidation && <ErrorMessage error={imageListValidation} />}

        <TouchableOpacity disabled={hotelImages?.hotelImageValue == "" ? true : false} onPress={() => { AddHotelImages() }} style={styles.loadImageBtn}>
            <Text style={{ color: Colors.WhiteColor }}>Load Image</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
            {hotelImages?.hotelImagesList?.length > 0 &&
                hotelImages?.hotelImagesList?.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity onPress={() => { RemoveHotelImage(item) }} style={styles.removeImageIcon}>
                            <Ionicons name={"close"} size={15} style={styles.closeIcon} />
                        </TouchableOpacity>
                        <Image source={{ uri: item?.url }} style={styles.hotelImages} />
                    </View>

                ))
            }
        </View>
        <View style={{ ...styles.dropdowncontainer, marginTop: 5 }}>
            <DropdownPicker
                multiple={true}
                placeholder={Languages.ba_signup_hotel_ameneties}
                listMode="MODAL"
                open={amenitiesOpen}
                value={amenities}
                data={Amenities}
                setOpen={setAmenitiesOpen}
                setValue={setamenities}
            />
        </View>
        <View style={styles.datecontainer}>
            <FontAwesome5 name={"calendar-alt"} size={15} color={Colors.PrimaryColor} />
            <TouchableOpacity style={styles.datebtn} onPress={() => { setShowDate(true) }}>
                {showHotelPlaceholder == true ? <Text style={styles.datetext}>{Languages.ba_signup_hotel_foundation_date}</Text> : <Text style={styles.datetext}>{moment(hotelDate).format('ll')}</Text>}
                {showDate && <DateTimePicker
                    value={hotelDate}
                    onChange={handleDate}
                />
                }
            </TouchableOpacity>
        </View>
        <View style={styles.descriptionbox}>
            <MaterialIcons name={"description"} size={15} color={Colors.PrimaryColor} style={styles.descriptionicon} />
            <TextInput
                style={styles.textbox}
                placeholder={Languages.ba_signup_hotel_breif_introduction}
                underlineColorAndroid="transparent"
                multiline={true}
                numberOfLines={8}
                placeholderTextColor={Colors.PrimaryColor}
                value={hotelDescription}
                onChangeText={(text) => { setHotelDescription(text) }}

            />
        </View>
    </>
}

<View style={{ ...styles.inputContainer, marginHorizontal: 20 }}>
    <FontAwesome5 name={"lock"} color={Colors.PrimaryColor} />
    <TextInput
        style={styles.textInput}
        placeholder={Languages.ba_signup_password}
        secureTextEntry={passwordVisible}
        placeholderTextColor={Colors.PrimaryColor}
        value={password}
        onChangeText={(text) => { setPassword(text), setPasswordValidation("") }}

    />
    <TouchableOpacity onPress={() => { setPasswordVisible(!passwordVisible) }}>
        <FontAwesome5 name={passwordVisible ? "eye-slash" : "eye"} color={Colors.PrimaryColor} />
    </TouchableOpacity>

</View>
{ passwordValidation && <ErrorMessage error={passwordValidation} /> }




<TouchableOpacity onPress={() => { Submit() }} style={styles.btn}>
    <Text style={styles.btntext}>{Languages.ba_signup_btn_txt}</Text>
</TouchableOpacity>