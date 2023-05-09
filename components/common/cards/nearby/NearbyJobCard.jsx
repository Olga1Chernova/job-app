import { View, Text, TouchableOpacity, Image } from "react-native";

import { checkImageURL } from "../../../../utils";
import styles from "./nearbyjobcard.style";

const fakeImg =
  "data:image/png;base64,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";


const NearbyJobCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(job.employer_logo)
              ? job.employer_logo
              : fakeImg,
          }}
          resizeMode="contain"
          style={styles.logImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job.job_title}
        </Text>
        <Text style={styles.jobType}>{job.job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
