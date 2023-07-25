// import {
//     Dimensions,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
//   } from 'react-native';
//   import React, {useEffect, useState} from 'react';
//   import LinearGradient from 'react-native-linear-gradient';
//   import SvgBack from '../../assets/BackIcon';
//   import SvgProfSettingsIcn from '../../assets/ProfSettingsIcn';
//   import BottomSheetComponent from '../../components/bottomsheet/BottomSheet';
//   import {GestureHandlerRootView} from 'react-native-gesture-handler';
//   import Svg, {Circle, Path, Text as SvgText} from 'react-native-svg';

//   const ProfileScreen = ({navigation}: any) => {
//     const [selectedDays, setSelectedDays] = useState(4);
//     const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

//     // to not show bottom bar in this screen
//     useEffect(() => {
//       const unsubscribe = navigation.addListener('focus', () => {
//         navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
//       });
//       return () => {
//         navigation.getParent()?.setOptions({tabBarStyle: {display: 'flex'}});
//         unsubscribe();
//       };
//     }, [navigation]);
//     /////////////////////////////

//     const toggleBottomSheet = () => {
//       setIsBottomSheetVisible(prevState => !prevState);
//     };

//     const renderStepperProgressBar = () => {
//       const stepperSize = 150;
//       const circleRadius = (stepperSize - 24) / 2;
//       // const circumference = circleRadius * 2 * Math.PI;
//       const progressAngle = (selectedDays / 4) * 2 * Math.PI;

//       return (
//         <View style={styles.stepperContainer}>
//           <Svg width={stepperSize} height={stepperSize}>
//             {/* Outer circle representing the full progress */}
//             <Circle
//               cx={stepperSize / 2}
//               cy={stepperSize / 2}
//               r={circleRadius}
//               fill={'none'}
//               stroke="#EAEAEA"
//               strokeWidth={12}
//             />

//             {/* Progress line */}
//             <Path
//               d={`M ${stepperSize / 2} ${stepperSize / 2 - circleRadius}
//         A ${circleRadius} ${circleRadius} 0 ${progressAngle > Math.PI ? 1 : 0} 1
//         ${stepperSize / 2 + circleRadius * Math.sin(progressAngle)}
//         ${stepperSize / 2 - circleRadius * Math.cos(progressAngle)}`}
//               stroke="#62CBF7"
//               strokeWidth={12}
//               strokeLinecap="round"
//             />

//             {/* Text displaying the selected days */}
//             <SvgText
//               x={stepperSize / 2}
//               y={stepperSize / 2}
//               textAnchor="middle"
//               alignmentBaseline="middle"
//               fontSize="24"
//               fontWeight="bold"
//               fill="#000">
//               {selectedDays}
//               <Text
//                 style={{
//                   position: 'absolute',
//                   top: 90,
//                   left: 55,
//                   fontSize: 12,
//                   color: '#bababa',
//                   fontWeight: '600',
//                 }}>
//                 {/* /4 days */}
//               </Text>
//             </SvgText>
//           </Svg>
//         </View>
//       );
//     };
//     return (
//       <GestureHandlerRootView>
//         <LinearGradient
//           colors={['#62CBF7', '#6EC3FA', '#6DB9FE', '#6EBAFE']}
//           start={{x: 0, y: 0.2}}
//           end={{x: 1, y: 0}}
//           style={styles.linearGradient}>
//           <View style={styles.iconsHeader}>
//             <View style={styles.favoritesMainContent}>
//               <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <SvgBack stroke="#fff" />
//               </TouchableOpacity>
//             </View>
//             <Text style={styles.headerText}>Profile</Text>
//             <View style={styles.favoritesMainContent}>
//               <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <SvgProfSettingsIcn stroke="#fff" />
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={styles.primaryContent}>
//             <View>
//               <Text style={styles.firstSectionHeadtext}>Weekly Goal</Text>
//               <Text style={styles.firstSectionSubHeadtext}>
//                 Complete a session on {selectedDays} days each week to achieve
//                 your goal
//               </Text>
//               <View style={styles.stepperContainer}>
//                 {renderStepperProgressBar()}
//               </View>

//               <TouchableOpacity onPress={toggleBottomSheet}>
//                 <Text style={styles.editWeeklyGoalBtn}>Edit</Text>
//               </TouchableOpacity>
//             </View>
//             <TouchableOpacity style={styles.logOutBtn}>
//               <Text>Log Out</Text>
//             </TouchableOpacity>
//           </View>
//           <BottomSheetComponent
//             isVisible={isBottomSheetVisible}
//             toggleBottomSheet={toggleBottomSheet}
//             // Add any other props you want to pass to the BottomSheetComponent here
//           >
//             {/* Content for the bottom sheet */}
//             <View>
//               <Text>This is the content of the Bottom Sheet</Text>
//             </View>
//           </BottomSheetComponent>
//         </LinearGradient>
//       </GestureHandlerRootView>
//     );
//   };

//   export default ProfileScreen;

//   const styles = StyleSheet.create({
//     linearGradient: {
//       paddingTop: 60,
//     },
//     iconsHeader: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//     },
//     primaryContent: {
//       rowGap: 8,
//       borderTopLeftRadius: 30,
//       borderTopRightRadius: 30,
//       borderWidth: 1,
//       borderColor: '#fff',
//       backgroundColor: '#fff',
//       paddingVertical: 40,
//       paddingHorizontal: 20,
//       justifyContent: 'space-between',
//     },
//     favoritesMainContent: {
//       marginHorizontal: 20,
//       marginBottom: 20,
//       alignItems: 'center',
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       borderWidth: 1,
//       borderRadius: 50,
//       borderColor: 'rgba(229,222,255, 0.3)',
//       backgroundColor: 'rgba(229,222,255, 0.3)',
//       padding: 5,
//     },
//     headerText: {
//       marginBottom: 20,
//       fontSize: 22,
//       fontWeight: '600',
//       color: '#fff',
//       marginLeft: 20,
//       marginRight: 10,
//     },
//     logOutBtn: {
//       width: '100%',
//       borderWidth: 1,
//       borderRadius: 30,
//       paddingVertical: 15,
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginBottom: '40%',
//     },
//     firstSectionHeadtext: {
//       fontSize: 18,
//       fontWeight: '600',
//       textAlign: 'center',
//       paddingBottom: 15,
//     },
//     firstSectionSubHeadtext: {
//       textAlign: 'center',
//       fontSize: 16,
//     },
//     editWeeklyGoalBtn: {
//       color: '#815cff',
//       fontSize: 14,
//       fontWeight: '500',
//       textAlign: 'center',
//       paddingTop: 10,
//     },
//     // styles for stepper
//     stepperContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginTop: 10,
//     },
//     // stepperProgressBar: {
//     //   alignItems: 'center',
//     //   justifyContent: 'center',
//     //   position: 'relative',
//     // },
//     // progressBackground: {
//     //   width: '100%',
//     //   height: '100%',
//     //   backgroundColor: '#EAEAEA',
//     //   overflow: 'hidden',
//     // },
//     // progressFill: {
//     //   backgroundColor: '#62CBF7',
//     // },
//     // stepperValue: {
//     //   color: '#000',
//     //   fontWeight: 'bold',
//     //   fontSize: 16,
//     //   position: 'absolute',
//     //   textAlign: 'center',
//     // },
//   });
