# what-to-eat-today
### brief
It's a simple application of neural network.After several times of training on sample data,it can make a prediction about your taste. 
Here is the [live demo](http://wtet.site:3000), you'd better access it using mobile phone.

### algorithm
The training process can be understood as persistently calibrating all of the “weights” by repeating two key steps, forward propagation and back propagation.
In forward propagation, it receives some input data and apply a set of weights to it and then
calculate an output.
In back propagation, it measure the margin of error of the output and adjust the weights accordingly to decrease the error.

### snapshot
![training](./snapshot1.jpg)
![predict](./snapshot2.jpg)
### license
MIT