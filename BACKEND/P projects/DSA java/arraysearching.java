public class arraysearching {
    
    public static void main(String[] args) {
        int arr[] = new int[10];
        int len = arr.length;
        for(int i = 0; i < 5; i++){
            arr[i] = i+3;
            System.out.println("arr["+ i +"] " + arr[i] );
        }

        for(int i = 0; i < 5; i++){
            if(arr[i] == 6){
                System.out.println("Elements 6 found at index : " + i);
            }
        }
     }
}
