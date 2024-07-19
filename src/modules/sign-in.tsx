import { Button, Form, FormProps, Input, Typography } from 'antd';
import { Lock, User } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/shared/hooks/use-redux';
import { signInAction } from '@/store/auth/action';
import { toast } from 'sonner';
import { OAuthConfig } from '@/configs/OAuthConfig';

/**
 * @author Duc Nguyen
 * @return Signin page
 */

function determineInputType(input: string): 'username' | 'email' {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(input) ? 'email' : 'username';
}

type LoginType = {
  user: string;
  username?: string;
  email?: string;
  password: string;
};

type FormType = FormProps<LoginType>;
const Signin = () => {
  const [form] = Form.useForm<LoginType>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onFinish: FormType['onFinish'] = async (value) => {
    const auth = {
      [determineInputType(value.user)]: value.user,
      ...value,
    };
    try {
      setIsSubmitting(true);

      const res = await dispatch(signInAction(auth));
      if (res.meta.requestStatus === 'rejected') {
        toast.error('Sign in failed', {
          description: 'Please check your username or password again',
        });
      } else {
        toast.success('Sign in successfully');
        navigate('/tsm/home');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className='absolute right-20 top-16 h-[550px] w-[540px] rounded-lg bg-white shadow-lg'>
      <div className='p-10'>
        <div className='flex flex-col gap-y-12'>
          <div className='flex items-start justify-between'>
            <div className='flex flex-col gap-y-2'>
              <Typography.Text className='text-2xl font-semibold'>
                Welcome to <span className='capitalize text-[#0089ED]'>TaskSmart</span>
              </Typography.Text>
              <Typography.Text className='text-5xl font-semibold'>Sign in</Typography.Text>
            </div>
            <div className='flex flex-col'>
              <Typography.Text className='text-sm'>No Account ?</Typography.Text>
              <Link to={'../sign-up'}>
                <Typography.Text className='cursor-pointer font-semibold text-[#0089ED] transition-all hover:underline'>
                  Sign up
                </Typography.Text>
              </Link>
            </div>
          </div>

          <div className='flex items-center gap-x-4'>
            <GoogleButton  />
            <GithubButton />
          </div>

          <Form layout='vertical' form={form} onFinish={onFinish}>
            <Form.Item
              name='user'
              label='Enter your username or email address'
              rules={[
                {
                  required: true,
                  message: 'Please enter your email address or username',
                },
              ]}
            >
              <Input prefix={<User className='w-4 h-4 mr-2 text-primary-default' />} size='large' />
            </Form.Item>
            <Form.Item
              name='password'
              label='Enter your Password'
              rules={[
                {
                  required: true,
                  message: 'Please enter your password',
                },
              ]}
            >
              <Input.Password
                prefix={<Lock className='w-4 h-4 mr-2 text-primary-default' />}
                size='large'
                type='password'
              />
            </Form.Item>
            <Button
              loading={isSubmitting}
              type='primary'
              size='large'
              htmlType='submit'
              className='w-full'
            >
              Sign in
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

const GoogleButton = (_props: {
  isSubmitting?: boolean;
  setIsSubmitting?: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClick = () => {
    const callbackUrl = OAuthConfig.google.redirectUri;
    const authUrl = OAuthConfig.google.authUri;
    const googleClientId = OAuthConfig.google.clientId;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

    console.log(targetUrl);

    window.location.href = targetUrl;
  };
  return (
    <Button
      size='large'
      className='flex items-center justify-center rounded-md bg-[#fafbff] text-sm hover:border'
      block
      icon={<GoogleIcon />}
      htmlType='button'
      onClick={handleClick}
    >
      Google
    </Button>
  );
};
const GithubButton = (_props: {
  isSubmitting?: boolean;
  setIsSubmitting?: Dispatch<SetStateAction<boolean>>;
}) => {

  const handleClick = () => {
    const callbackUrl = OAuthConfig.github.redirectUri;
    const authUrl = OAuthConfig.github.authUri;
    const githubClientId = OAuthConfig.github.clientId;

    const scope = 'user:email';

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(callbackUrl)}&response_type=code&client_id=${githubClientId}&scope=${encodeURIComponent(scope)}`;

    console.log(targetUrl);

    window.location.href = targetUrl;
  };
  return (
    <Button
      size='large'
      className='flex items-center justify-center rounded-md bg-[#fafbff] text-sm hover:border'
      block
      icon={<GithubIcon />}
      htmlType='button'
      onClick={handleClick}
    >
      Github
    </Button>
  );
};

const GoogleIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      width='20'
      height='20'
      viewBox='0 0 48 48'
    >
      <path
        fill='#fbc02d'
        d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
      ></path>
      <path
        fill='#e53935'
        d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
      ></path>
      <path
        fill='#4caf50'
        d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
      ></path>
      <path
        fill='#1565c0'
        d='M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
      ></path>
    </svg>
  );
};

const GithubIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      zoomAndPan='magnify'
      viewBox='0 0 810 809.999993'
      height='20'
      preserveAspectRatio='xMidYMid meet'
      version='1.0'
    >
      <defs>
        <clipPath id='adeecb262b'>
          <path d='M 3 8 L 801.75 8 L 801.75 810 L 3 810 Z M 3 8 ' clipRule='nonzero' />
        </clipPath>
      </defs>
      <rect x='-81' width='972' fill='#ffffff' y='-80.999999' height='971.999992' fillOpacity='1' />
      <rect x='-81' width='972' fill='#ffffff' y='-80.999999' height='971.999992' fillOpacity='1' />
      <g clipPath='url(#adeecb262b)'>
        <path
          fill='#000000'
          d='M 574.855469 809.953125 C 573.542969 809.953125 572.230469 809.890625 570.925781 809.761719 C 569.617188 809.632812 568.320312 809.441406 567.035156 809.183594 C 565.746094 808.929688 564.472656 808.609375 563.21875 808.226562 C 561.960938 807.847656 560.726562 807.40625 559.515625 806.902344 C 558.300781 806.398438 557.117188 805.839844 555.957031 805.21875 C 554.800781 804.601562 553.675781 803.925781 552.582031 803.199219 C 551.492188 802.46875 550.4375 801.6875 549.421875 800.855469 C 548.410156 800.019531 547.4375 799.140625 546.507812 798.210938 C 545.582031 797.28125 544.699219 796.3125 543.867188 795.296875 C 543.035156 794.28125 542.253906 793.226562 541.523438 792.136719 C 540.792969 791.042969 540.121094 789.917969 539.5 788.761719 C 538.882812 787.601562 538.320312 786.417969 537.820312 785.203125 C 537.316406 783.992188 536.875 782.753906 536.492188 781.5 C 536.113281 780.242188 535.792969 778.96875 535.539062 777.683594 C 535.28125 776.394531 535.089844 775.097656 534.960938 773.789062 C 534.832031 772.484375 534.765625 771.171875 534.765625 769.859375 L 534.765625 665.613281 C 535.078125 662.625 535.230469 659.628906 535.230469 656.621094 C 535.226562 653.617188 535.066406 650.617188 534.75 647.628906 C 534.433594 644.640625 533.960938 641.675781 533.335938 638.738281 C 532.707031 635.796875 531.929688 632.898438 531 630.039062 C 530.070312 627.179688 528.996094 624.378906 527.773438 621.632812 C 526.550781 618.886719 525.1875 616.214844 523.683594 613.609375 C 522.183594 611.007812 520.546875 608.488281 518.78125 606.058594 C 517.015625 603.625 515.128906 601.292969 513.121094 599.058594 C 511.878906 597.710938 510.734375 596.285156 509.6875 594.78125 C 508.640625 593.277344 507.703125 591.707031 506.871094 590.074219 C 506.039062 588.441406 505.324219 586.761719 504.722656 585.03125 C 504.121094 583.300781 503.640625 581.535156 503.28125 579.738281 C 502.921875 577.941406 502.6875 576.128906 502.578125 574.300781 C 502.464844 572.472656 502.480469 570.644531 502.621094 568.816406 C 502.761719 566.988281 503.023438 565.179688 503.414062 563.390625 C 503.800781 561.597656 504.308594 559.84375 504.9375 558.121094 C 505.566406 556.402344 506.308594 554.730469 507.167969 553.113281 C 508.023438 551.492188 508.988281 549.941406 510.058594 548.453125 C 511.128906 546.964844 512.296875 545.558594 513.558594 544.230469 C 514.820312 542.90625 516.167969 541.671875 517.601562 540.527344 C 519.035156 539.386719 520.539062 538.347656 522.113281 537.410156 C 523.6875 536.472656 525.320312 535.648438 527.007812 534.9375 C 528.695312 534.226562 530.421875 533.632812 532.191406 533.15625 C 533.960938 532.679688 535.753906 532.328125 537.574219 532.101562 C 635.386719 520.472656 725.582031 489.199219 725.582031 319.597656 C 725.589844 311.722656 725.023438 303.890625 723.875 296.101562 C 722.730469 288.308594 721.019531 280.644531 718.746094 273.105469 C 716.46875 265.566406 713.65625 258.234375 710.300781 251.109375 C 706.945312 243.984375 703.085938 237.144531 698.726562 230.589844 C 696.726562 227.589844 694.878906 224.503906 693.179688 221.324219 C 691.484375 218.144531 689.949219 214.890625 688.570312 211.5625 C 687.191406 208.234375 685.980469 204.84375 684.933594 201.394531 C 683.890625 197.949219 683.015625 194.457031 682.3125 190.921875 C 681.609375 187.390625 681.082031 183.828125 680.726562 180.242188 C 680.371094 176.65625 680.195312 173.0625 680.191406 169.460938 C 680.191406 165.855469 680.363281 162.261719 680.714844 158.675781 C 681.066406 155.089844 681.589844 151.527344 682.289062 147.992188 C 684.097656 138.660156 685 129.234375 685 119.726562 C 685 110.21875 684.097656 100.796875 682.289062 91.460938 C 667.28125 96.535156 652.753906 102.738281 638.703125 110.066406 C 624.65625 117.394531 611.257812 125.757812 598.507812 135.164062 C 596.09375 136.875 593.527344 138.304688 590.800781 139.449219 C 588.074219 140.589844 585.253906 141.421875 582.34375 141.945312 C 579.433594 142.464844 576.5 142.660156 573.546875 142.53125 C 570.589844 142.402344 567.6875 141.949219 564.832031 141.179688 C 555.84375 138.636719 546.777344 136.410156 537.632812 134.492188 C 528.492188 132.578125 519.292969 130.976562 510.039062 129.695312 C 500.789062 128.414062 491.5 127.449219 482.183594 126.808594 C 472.863281 126.164062 463.53125 125.84375 454.191406 125.84375 C 444.851562 125.84375 435.519531 126.164062 426.199219 126.808594 C 416.882812 127.449219 407.59375 128.414062 398.34375 129.695312 C 389.089844 130.976562 379.890625 132.578125 370.75 134.492188 C 361.605469 136.410156 352.539062 138.636719 343.550781 141.179688 C 340.695312 141.949219 337.792969 142.402344 334.835938 142.53125 C 331.882812 142.660156 328.949219 142.464844 326.039062 141.945312 C 323.128906 141.421875 320.308594 140.589844 317.582031 139.449219 C 314.855469 138.304688 312.289062 136.875 309.875 135.164062 C 297.046875 125.648438 283.539062 117.226562 269.347656 109.894531 C 255.160156 102.566406 240.472656 96.417969 225.292969 91.460938 C 223.386719 100.785156 222.433594 110.207031 222.433594 119.726562 C 222.433594 129.246094 223.386719 138.667969 225.292969 147.992188 C 225.941406 151.574219 226.417969 155.179688 226.722656 158.804688 C 227.023438 162.433594 227.15625 166.066406 227.109375 169.703125 C 227.066406 173.34375 226.847656 176.972656 226.453125 180.589844 C 226.0625 184.210938 225.496094 187.800781 224.761719 191.363281 C 224.023438 194.929688 223.117188 198.449219 222.042969 201.925781 C 220.96875 205.402344 219.734375 208.820312 218.332031 212.179688 C 216.929688 215.539062 215.371094 218.824219 213.652344 222.03125 C 211.9375 225.242188 210.070312 228.359375 208.054688 231.390625 C 203.710938 237.992188 199.867188 244.875 196.523438 252.039062 C 193.179688 259.199219 190.371094 266.5625 188.09375 274.132812 C 185.820312 281.703125 184.105469 289.398438 182.949219 297.21875 C 181.792969 305.035156 181.210938 312.898438 181.195312 320.800781 C 181.195312 476.769531 256.558594 518.46875 369.605469 532.902344 C 371.445312 533.128906 373.261719 533.484375 375.054688 533.964844 C 376.84375 534.445312 378.59375 535.046875 380.300781 535.769531 C 382.011719 536.492188 383.660156 537.332031 385.25 538.285156 C 386.84375 539.234375 388.359375 540.292969 389.804688 541.457031 C 391.25 542.621094 392.609375 543.878906 393.878906 545.226562 C 395.148438 546.578125 396.320312 548.011719 397.390625 549.527344 C 398.460938 551.039062 399.421875 552.621094 400.277344 554.269531 C 401.128906 555.917969 401.863281 557.613281 402.476562 559.363281 C 403.058594 561.0625 403.523438 562.792969 403.871094 564.550781 C 404.21875 566.3125 404.445312 568.085938 404.558594 569.878906 C 404.667969 571.667969 404.65625 573.460938 404.523438 575.25 C 404.394531 577.039062 404.144531 578.8125 403.777344 580.566406 C 403.40625 582.324219 402.921875 584.046875 402.324219 585.738281 C 401.722656 587.429688 401.011719 589.074219 400.191406 590.667969 C 399.371094 592.265625 398.449219 593.796875 397.421875 595.269531 C 396.394531 596.742188 395.273438 598.136719 394.058594 599.457031 C 392.117188 601.535156 390.285156 603.710938 388.566406 605.976562 C 386.84375 608.246094 385.246094 610.597656 383.769531 613.027344 C 382.292969 615.460938 380.949219 617.964844 379.730469 620.535156 C 378.511719 623.109375 377.429688 625.738281 376.484375 628.421875 C 375.539062 631.105469 374.730469 633.832031 374.066406 636.597656 C 373.402344 639.367188 372.882812 642.160156 372.507812 644.980469 C 372.132812 647.804688 371.902344 650.636719 371.820312 653.480469 C 371.738281 656.324219 371.800781 659.167969 372.011719 662.007812 L 372.011719 769.859375 C 372.011719 771.171875 371.949219 772.484375 371.820312 773.789062 C 371.691406 775.097656 371.496094 776.394531 371.242188 777.683594 C 370.984375 778.96875 370.667969 780.242188 370.285156 781.5 C 369.90625 782.753906 369.460938 783.992188 368.960938 785.203125 C 368.457031 786.417969 367.898438 787.601562 367.277344 788.761719 C 366.660156 789.917969 365.984375 791.042969 365.257812 792.136719 C 364.527344 793.226562 363.746094 794.28125 362.914062 795.296875 C 362.078125 796.3125 361.199219 797.28125 360.269531 798.210938 C 359.34375 799.140625 358.371094 800.019531 357.355469 800.855469 C 356.339844 801.6875 355.289062 802.46875 354.195312 803.199219 C 353.105469 803.925781 351.980469 804.601562 350.820312 805.21875 C 349.664062 805.839844 348.476562 806.398438 347.265625 806.902344 C 346.050781 807.40625 344.816406 807.847656 343.5625 808.226562 C 342.304688 808.609375 341.03125 808.929688 339.746094 809.183594 C 338.457031 809.441406 337.160156 809.632812 335.855469 809.761719 C 334.546875 809.890625 333.238281 809.953125 331.925781 809.953125 C 330.613281 809.953125 329.300781 809.890625 327.996094 809.761719 C 326.6875 809.632812 325.390625 809.441406 324.105469 809.183594 C 322.816406 808.929688 321.542969 808.609375 320.289062 808.226562 C 319.03125 807.847656 317.796875 807.40625 316.582031 806.902344 C 315.371094 806.398438 314.183594 805.839844 313.027344 805.21875 C 311.871094 804.601562 310.746094 803.925781 309.652344 803.199219 C 308.5625 802.46875 307.507812 801.6875 306.492188 800.855469 C 305.476562 800.019531 304.507812 799.140625 303.578125 798.210938 C 302.648438 797.28125 301.769531 796.3125 300.9375 795.296875 C 300.101562 794.28125 299.320312 793.226562 298.59375 792.136719 C 297.863281 791.042969 297.1875 789.917969 296.570312 788.761719 C 295.953125 787.601562 295.390625 786.417969 294.886719 785.203125 C 294.386719 783.992188 293.945312 782.753906 293.5625 781.5 C 293.183594 780.242188 292.863281 778.96875 292.605469 777.683594 C 292.351562 776.394531 292.160156 775.097656 292.03125 773.789062 C 291.902344 772.484375 291.835938 771.171875 291.835938 769.859375 L 291.835938 747.007812 C 286.9375 747.570312 282.023438 747.984375 277.097656 748.242188 C 272.171875 748.503906 267.242188 748.613281 262.308594 748.574219 C 257.375 748.53125 252.449219 748.335938 247.527344 747.992188 C 242.609375 747.648438 237.703125 747.152344 232.8125 746.503906 C 227.921875 745.855469 223.054688 745.058594 218.214844 744.113281 C 213.375 743.167969 208.566406 742.074219 203.792969 740.832031 C 199.019531 739.589844 194.285156 738.199219 189.597656 736.667969 C 184.910156 735.132812 180.273438 733.457031 175.6875 731.636719 C 171.101562 729.820312 166.574219 727.859375 162.109375 725.765625 C 157.644531 723.667969 153.25 721.433594 148.921875 719.066406 C 144.59375 716.699219 140.34375 714.199219 136.167969 711.570312 C 131.996094 708.941406 127.90625 706.183594 123.902344 703.304688 C 119.898438 700.421875 115.984375 697.421875 112.164062 694.300781 C 108.34375 691.179688 104.625 687.941406 101.003906 684.589844 C 97.382812 681.238281 93.871094 677.78125 90.460938 674.214844 C 87.054688 670.648438 83.757812 666.980469 80.574219 663.207031 C 74 655.921875 66.804688 649.308594 58.984375 643.378906 C 51.167969 637.445312 42.863281 632.292969 34.074219 627.925781 C 32.800781 627.597656 31.546875 627.207031 30.308594 626.757812 C 29.074219 626.304688 27.863281 625.792969 26.679688 625.222656 C 25.492188 624.65625 24.339844 624.027344 23.214844 623.34375 C 22.089844 622.660156 21.003906 621.921875 19.953125 621.132812 C 18.898438 620.339844 17.890625 619.5 16.921875 618.609375 C 15.953125 617.722656 15.03125 616.785156 14.152344 615.804688 C 13.277344 614.824219 12.449219 613.804688 11.671875 612.742188 C 10.894531 611.679688 10.171875 610.582031 9.503906 609.449219 C 8.835938 608.316406 8.222656 607.152344 7.667969 605.960938 C 7.113281 604.765625 6.621094 603.550781 6.183594 602.308594 C 5.75 601.066406 5.378906 599.804688 5.066406 598.527344 C 4.753906 597.25 4.507812 595.960938 4.324219 594.65625 C 4.140625 593.355469 4.019531 592.046875 3.964844 590.730469 C 3.90625 589.417969 3.917969 588.101562 3.988281 586.789062 C 4.0625 585.476562 4.199219 584.167969 4.402344 582.867188 C 4.605469 581.566406 4.871094 580.28125 5.199219 579.007812 C 5.527344 577.734375 5.917969 576.476562 6.367188 575.242188 C 6.820312 574.007812 7.332031 572.796875 7.902344 571.609375 C 8.472656 570.425781 9.097656 569.269531 9.78125 568.148438 C 10.46875 567.023438 11.203125 565.933594 11.996094 564.882812 C 12.785156 563.832031 13.625 562.824219 14.515625 561.855469 C 15.40625 560.886719 16.34375 559.960938 17.324219 559.085938 C 18.304688 558.207031 19.324219 557.382812 20.386719 556.605469 C 21.449219 555.828125 22.546875 555.105469 23.679688 554.4375 C 24.8125 553.769531 25.976562 553.160156 27.167969 552.605469 C 28.363281 552.050781 29.578125 551.554688 30.820312 551.121094 C 32.0625 550.6875 33.320312 550.3125 34.601562 550.003906 C 35.878906 549.691406 37.167969 549.445312 38.472656 549.261719 C 39.773438 549.078125 41.082031 548.957031 42.398438 548.902344 C 43.710938 548.847656 45.023438 548.855469 46.339844 548.929688 C 47.652344 549.003906 48.957031 549.144531 50.257812 549.34375 C 51.558594 549.546875 52.84375 549.8125 54.117188 550.140625 C 61.796875 552.941406 69.273438 556.203125 76.550781 559.929688 C 83.824219 563.65625 90.84375 567.816406 97.601562 572.414062 C 104.359375 577.007812 110.808594 582.007812 116.945312 587.402344 C 123.085938 592.800781 128.867188 598.554688 134.292969 604.671875 C 174.378906 644.765625 214.46875 680.046875 290.632812 665.613281 C 289.964844 654.851562 290.40625 644.132812 291.960938 633.460938 C 293.511719 622.789062 296.144531 612.390625 299.855469 602.265625 C 217.273438 581.414062 99.417969 522.074219 99.417969 321.601562 C 99.390625 309.796875 100.230469 298.050781 101.933594 286.367188 C 103.632812 274.683594 106.183594 263.1875 109.578125 251.878906 C 112.972656 240.570312 117.179688 229.570312 122.195312 218.882812 C 127.207031 208.191406 132.980469 197.929688 139.503906 188.089844 C 140.710938 186.277344 141.738281 184.371094 142.578125 182.367188 C 143.421875 180.359375 144.066406 178.292969 144.511719 176.164062 C 144.957031 174.035156 145.199219 171.882812 145.234375 169.707031 C 145.265625 167.53125 145.09375 165.371094 144.714844 163.230469 C 142.699219 152.464844 141.46875 141.613281 141.015625 130.671875 C 140.5625 119.730469 140.898438 108.8125 142.015625 97.921875 C 143.136719 87.027344 145.03125 76.269531 147.699219 65.648438 C 150.367188 55.03125 153.78125 44.65625 157.945312 34.527344 C 159.082031 31.8125 160.5 29.253906 162.199219 26.851562 C 163.902344 24.449219 165.84375 22.257812 168.023438 20.285156 C 170.207031 18.308594 172.578125 16.59375 175.136719 15.140625 C 177.699219 13.691406 180.386719 12.535156 183.199219 11.671875 C 196.828125 7.664062 245.734375 -0.355469 338.339844 59.785156 C 357.011719 55.292969 375.886719 51.914062 394.964844 49.648438 C 414.039062 47.386719 433.179688 46.253906 452.386719 46.253906 C 471.59375 46.253906 490.738281 47.386719 509.8125 49.648438 C 528.886719 51.914062 547.761719 55.292969 566.4375 59.785156 C 659.039062 -0.355469 707.945312 7.261719 721.175781 11.671875 C 723.988281 12.535156 726.675781 13.691406 729.234375 15.140625 C 731.796875 16.59375 734.167969 18.308594 736.347656 20.285156 C 738.53125 22.257812 740.472656 24.449219 742.171875 26.851562 C 743.875 29.253906 745.292969 31.8125 746.429688 34.527344 C 750.597656 44.6875 754.019531 55.097656 756.695312 65.75 C 759.367188 76.402344 761.261719 87.195312 762.382812 98.121094 C 763.5 109.046875 763.832031 120 763.375 130.972656 C 762.921875 141.949219 761.679688 152.835938 759.65625 163.632812 C 759.246094 165.585938 759.035156 167.5625 759.019531 169.5625 C 759.003906 171.558594 759.183594 173.539062 759.5625 175.503906 C 759.941406 177.464844 760.507812 179.371094 761.269531 181.21875 C 762.027344 183.066406 762.960938 184.824219 764.066406 186.484375 C 770.613281 196.351562 776.394531 206.648438 781.421875 217.367188 C 786.445312 228.089844 790.65625 239.121094 794.050781 250.464844 C 797.445312 261.808594 799.992188 273.339844 801.683594 285.058594 C 803.378906 296.78125 804.199219 308.558594 804.15625 320.402344 C 804.15625 523.679688 687.101562 582.617188 603.71875 601.0625 C 607.390625 611.820312 609.96875 622.832031 611.453125 634.101562 C 612.9375 645.371094 613.296875 656.679688 612.535156 668.019531 L 612.535156 769.859375 C 612.539062 771.125 612.480469 772.386719 612.363281 773.644531 C 612.246094 774.902344 612.070312 776.15625 611.835938 777.398438 C 611.601562 778.640625 611.308594 779.867188 610.957031 781.082031 C 610.605469 782.296875 610.195312 783.492188 609.730469 784.667969 C 609.265625 785.84375 608.746094 786.996094 608.175781 788.121094 C 607.601562 789.25 606.976562 790.347656 606.296875 791.414062 C 605.621094 792.480469 604.894531 793.515625 604.121094 794.511719 C 603.34375 795.511719 602.523438 796.472656 601.660156 797.394531 C 600.792969 798.316406 599.886719 799.191406 598.9375 800.027344 C 597.988281 800.863281 597 801.652344 595.976562 802.394531 C 594.953125 803.136719 593.898438 803.828125 592.808594 804.472656 C 591.71875 805.113281 590.601562 805.703125 589.457031 806.238281 C 588.3125 806.777344 587.144531 807.257812 585.957031 807.683594 C 584.765625 808.109375 583.558594 808.476562 582.332031 808.789062 C 581.105469 809.101562 579.871094 809.355469 578.621094 809.550781 C 577.371094 809.742188 576.117188 809.878906 574.855469 809.953125 Z M 574.855469 809.953125 '
          fillOpacity='1'
          fillRule='nonzero'
        />
      </g>
    </svg>
  );
};
export default Signin;
