import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigation/AppNavigator";
import {RouteProp} from "@react-navigation/native";

type IdentityVerificationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'IdentityVerification'>;
type IdentityVerificationScreenRouteProp = RouteProp<RootStackParamList, 'IdentityVerification'>;

export interface IdentityVerificationScreenProps {
    navigation: IdentityVerificationScreenNavigationProp;
    route: IdentityVerificationScreenRouteProp;
}
