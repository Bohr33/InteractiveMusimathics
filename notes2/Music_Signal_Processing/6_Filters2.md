#Amplitude Response

Let's use the example where our transfer function is a simple first order IIR filter. $H(z) = \frac{1-a}{z-a}$ and $a=0.5$. 

Thus, $H(z)=\frac{0.5}{z-0.5}$.

The amplitude response of a given transfer function $H(z) = |H(z)|$

1. First, we want to substitute $e^{j\omega}$ for $z$

	$$
	 H(e^{j\omega})= \frac{0.5}{e^{j\omega}-0.5}
	$$
	
2. Next, we want to calculate the magnitude of our complex expression $e^{j\omega} - 0.5$

	The magnitude can be calculated with the pythagorean thereom as $|m|=\sqrt{a+jb}$ and we can use Euler's Identity to convert the exponential term into trigonemtric terms $e^{j\omega}=\cos(\omega)+j\sin(\omega)$.
	
	$$
	e^{j\omega} - 0.5 = \cos(\omega)+j\sin(\omega) - 0.5\\
	e^{j\omega} - 0.5 = \cos(\omega)- 0.5 +j\sin(\omega)
	$$
	
	Thus the magnitude becomes...
	$$
	|m|= \sqrt{(\cos(\omega) - 0.5)^2 + (\sin(\omega))^2}\\
	(\cos(\omega) - 0.5)^2 = \cos^2(\omega) -0.5\cos(\omega) - 0.5\cos(\omega) + 0.25\\
	= \cos^2(\omega) -\cos(\omega)+ 0.25\\
	|m|= \sqrt{\cos^2(\omega) -\cos(\omega)+ 0.25 + (\sin(\omega))^2}\\
	$$
	
	We can use the pythagorean identity $cos^2(\omega)+sin^2(\omega)=1$ to simplify further
	
	$$
		\cos^2(\omega) -\cos(\omega)+ 0.25 + \sin^2(\omega) = -\cos(\omega) + 0.25 + 1\\
		= 1.25 - \cos(\omega)
	$$
	
	Thus our magnitude is...
	$$
	|m| = \sqrt{1.25 - \cos(\omega)}
	$$
	and out final amplitude response equation is...
	$$
	A(\omega)=\frac{0.5}{\sqrt{1.25 - \cos(\omega)}}
	$$
	
#Phase Response
To calculate the phase response, we use a similar process to the amplitude response, however instead of obtiang the **magnitude** by using the pythagorean thereom on the real and imaginary components, we instead obtain the phase angle by taking the inverse tangent of the real and imaginary components.

$$
\theta(\omega)=\arg(H(z))
$$
Here the function $\arg(C)$ denotes obtaining the angle of some complex number $C$. By substituting $z=e^{i\omega}$ and isolating the real and imaginary components, this becomes...
$$
\theta(\omega)=\tan^{-1}(\frac{\Im(H(z))}{\Re(H(z))})\\
$$

###Ex 1. First Order FIR
Lets look at a simple example of a first order FIR filter.
$$
H(z)=1+z^{-1}
$$
Substituting $e^{j\omega}$ this becomes...
$$
H(e^{j\omega})= 1+e^{-j\omega}
$$
By using Euler's Formula $e^{j\omega} = \cos(\omega)+j\sin(\omega)$ and noting that $e^{-j\omega}$ inverts the imaginary component, this becomes...
$$
H(e^{j\omega})= 1 + \cos(\omega)-j\sin(\omega)
$$
Now we can isolate the real and imaginary components
$$
\Re(H(e^{j\omega}))=1 + \cos(\omega)\\
\Im(H(e^{j\omega}))=-\sin(\omega)
$$
and insert them into the numerator and denominator of the phase angle formula
$$
\theta(\omega)=\tan^{-1}(\frac{-\sin(\omega)}{1 + \cos(\omega)})\\
$$
This is our answer, however we can simplify by using the following identities...
$$
\sin(x)=2\sin(x/2)\cos(x/2)\\
1 + \cos(x)=2\cos^2(x/2)
$$
By replacing our numerator and denominator with these, our formula becomes...
$$
\theta(\omega)=\tan^{-1}(\frac{-2\sin(\omega/2)\cos(\omega/2)}{2\cos^2(\omega/2)})\\
$$
Now we can simplify...
$$
\theta(\omega)=\tan^{-1}(\frac{-\sin(\omega/2)}{\cos(\omega/2)})\\
$$
And since $\tan(\omega)=\frac{\sin(\omega)}{\cos(\omega)}$...
$$
\theta(\omega)=\tan^{-1}(-\tan(\omega/2))\\
\theta(\omega)=-\omega/2
$$

###IIR Note
We should note, when dealing with an IIR filter, our transfer function will have a denominator. When we extract the real and imaginary components however, we can ignore this denominator by using the relationship...
$$
\arg(1/Z)=-\arg(Z)\\
$$
This means instead of doing...
$$
\arg(H(z))=\arg(\frac{1}{D(z)})
$$
where $D(z)$ denotes the real and imaginary breakdown of the coefficients, we can say...
$$
\arg(H(z))=-\arg(D(z))
$$


	
	
	