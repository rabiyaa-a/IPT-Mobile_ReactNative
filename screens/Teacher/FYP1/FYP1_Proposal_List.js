import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { View } from 'react-native';
import { AsyncStorage } from 'react-native';


class FYP1_Proposal_List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            id: "",
            title: "",
            leader_email: "", 
            proposals: [],
            leader:""

        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {

        const markers = [];
        let ip = await AsyncStorage.getItem('ip');
        let session_email = await AsyncStorage.getItem('email');

        await fetch('http://' + ip + ':3006/fyp1proposal_list?Email=' + session_email + ' ')
            .then(res => res.json())

            .then(res => {
                res.map((element) => {
                    const marketObj = {};
                    marketObj.id = element.id;
                    marketObj.title = element.title;
                    marketObj.leader_email = element.leader_email;

                    markers.push(marketObj);
                });

                this.setState({ proposals: markers });
            });
    }

    render() {
        const{leader} = this.state;

        return (
            <Block>
                <ScrollView>

                    {this.state.proposals.map((item, key) => (
                        
                        <TouchableOpacity  style={[styles.card, { backgroundColor: '#008080' }]} onPress={() => {
                            AsyncStorage.setItem('leader', item.leader_email);
                            this.props.navigation.navigate("FYP1_ProposalForm_View");
                            
                        }}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.title}>Title: {item.title}</Text>
                                <Image style={styles.icon} source={{ uri: "https://img.icons8.com/ios/40/000000/settings.png" }} />
                            </View>

                            <View style={styles.cardFooter}>
                                <Text key={key} style={styles.subTitle}>Proposal ID: {item.id}</Text>

                            </View>
                            <View style={styles.cardFooter}>

                                <Text key={key} style={styles.subTitle}>Leader email: {item.leader_email}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                    )}


                </ScrollView>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 2,
        marginVertical: 2,
        flexBasis: '48%',
        marginTop: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 30,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    icon: {
        height: 20,
        width: 20,
    },
    title: {
        fontFamily: 'montserrat-regular',
        fontSize: 20,
        flex: 1,
        color: "#FFFFFF",
        fontWeight: '500'
    },
    subTitle: {
        fontFamily: 'montserrat-regular',
        fontSize: 16,
        flex: 1,
        color: "#FFFFFF",
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
});



export default FYP1_Proposal_List;
