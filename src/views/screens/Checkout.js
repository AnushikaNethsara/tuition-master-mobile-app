import React from 'react';

const CheckoutScreen = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 15,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Total Price</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>$50</Text>
        </View>
        <View style={{ marginHorizontal: 30 }}>
          <PrimaryButton title="CHECKOUT" />
        </View>
      </View>
    );
}
 
export default CheckoutScreen;

//ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}