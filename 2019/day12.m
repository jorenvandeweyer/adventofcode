moons = [
    struct('x', 16, 'y', 10, 'z', 13, 'vx', 0 , 'vy', 0, 'vz', 0);
    struct('x', 4, 'y', 5, 'z', 10, 'vx', 0 , 'vy', 0, 'vz', 0);
    struct('x', 17, 'y', -5, 'z', 6, 'vx', 0 , 'vy', 0, 'vz', 0);
    struct('x', 13, 'y', -3, 'z', 0, 'vx', 0 , 'vy', 0, 'vz', 0);
];

values = [13; 16; 17];
times = zeros(1, 40000);

for i = 1 : 40000
    moons = step(moons);
    
    for j = 1 : length(moons)
        values((j-1)*3+1,i) = moons(j).x;
        values((j-1)*3+2,i) = moons(j).y;
        values((j-1)*3+3,i) = moons(j).z;
    end

    times(i) = i;
end

plot(times, values);

function moons = step(moons)
    for i = 1 : length(moons)
        for j = 1 : length(moons)
            if (i == j)
                continue;
            end
            
            if (moons(i).x ~= moons(j).x) 
                if (moons(i).x < moons(j).x)
                    moons(i).vx = moons(i).vx + 1;
                else
                    moons(i).vx = moons(i).vx - 1;
                end
            end
            
            if (moons(i).y ~= moons(j).y) 
                if (moons(i).y < moons(j).y)
                    moons(i).vy = moons(i).vy + 1;
                else
                    moons(i).vy = moons(i).vy - 1;
                end
            end
            
            if (moons(i).z ~= moons(j).z) 
                if (moons(i).z < moons(j).z)
                    moons(i).vz = moons(i).vz + 1;
                else
                    moons(i).vz = moons(i).vz - 1;
                end
            end
        end
    end

    
    for i = 1 : length(moons)
        moons(i).x = moons(i).x + moons(i).vx;
        moons(i).y = moons(i).y + moons(i).vy;
        moons(i).z = moons(i).z + moons(i).vz;
    end
    
 
end