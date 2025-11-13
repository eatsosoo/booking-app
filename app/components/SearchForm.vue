<template>
    <div>
        <div class="grid md:grid-cols-4 gap-4 md:w-3/4 p-8 mt-4 shadow-md rounded-md">
            <Input id="information" v-model="information" type="text" required placeholder="Thông tin..." />
            <Select>
                <SelectTrigger class="w-full">
                    <SelectValue placeholder="Chọn địa điểm..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup v-for="group in groups" :key="group.label">
                        <SelectLabel>{{ group.label }}</SelectLabel>
                        <SelectItem v-for="item in group.value" :key="item" :value="item">
                            {{ item }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger class="w-full">
                    <SelectValue placeholder="Số phòng ngủ..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Loại căn hộ</SelectLabel>
                        <SelectItem v-for="item in roomTypes" :key="item.value" :value="item.value">
                            {{ item.label }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <!-- Action -->
            <div class="grid grid-cols-2">
                <Button variant="outline" size="icon" @click="isOpen = !isOpen">
                    <FontAwesomeIcon :icon="['fas', 'filter']" />
                </Button>
                <Button>Tìm kiếm</Button>
            </div>
        </div>

        <transition name="fade">
            <div v-if="isOpen" class="md:w-3/4 p-8 mt-4 shadow-md rounded-md font-semibold">
                <p class="mb-2">Giá từ: {{ formatCurrency(minCash) }} - {{ formatCurrency(maxCash) }}</p>
                <RangeSlider />
                <Separator class="mt-4 mb-8" />
                <p>DỊCH VỤ ĐI KÈM</p>
                <div class="grid grid-cols-3 mt-2 gap-4">
                    <label v-for="service in services" :key="service.value" class="flex space-x-2 text-[0.8rem]">
                        <Checkbox />
                        <span>{{ service.label }}</span>
                    </label>
                </div>
            </div>
        </transition>

    </div>
</template>

<script setup lang="ts">
import Input from '~/components/ui/input/Input.vue';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import Button from './ui/button/Button.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Separator from './ui/separator/Separator.vue';
import Checkbox from './ui/checkbox/Checkbox.vue';

const groups = [
    {
        label: 'North America',
        value: [
            'Eastern Standard Time (EST)',
            'Central Standard Time (CST)',
            'Mountain Standard Time (MST)',
            'Pacific Standard Time (PST)',
            'Alaska Standard Time (AKST)',
            'Hawaii Standard Time (HST)',
        ]
    },
    {
        label: 'Europe & Africa',
        value: [
            'Greenwich Mean Time (GMT)',
            'Central European Time (CET)',
            'Eastern European Time (EET)',
            'Western European Summer Time (WEST)',
            'Central Africa Time (CAT)',
            'East Africa Time (EAT)',
        ]
    },
    {
        label: 'Asia',
        value: [
            'Moscow Time (MSK)',
            'India Standard Time (IST)',
            'China Standard Time (CST)',
            'Japan Standard Time (JST)',
            'Korea Standard Time (KST)',
            'Indonesia Central Standard Time (WITA)',
        ]
    },
    {
        label: 'Australia & Pacific',
        value: [
            'Australian Western Standard Time (AWST)',
            'Australian Central Standard Time (ACST)',
            'Australian Eastern Standard Time (AEST)',
            'New Zealand Standard Time (NZST)',
            'Fiji Time (FJT)',
        ],
    },
    {
        label: 'South America',
        value: [
            'Argentina Time (ART)',
            'Bolivia Time (BOT)',
            'Brasilia Time (BRT)',
            'Chile Standard Time (CLT)',
        ]
    }
]
const roomTypes = [
    {
        label: 'Studio',
        value: 'STD',
    },
    {
        label: 'Căn hộ 1 PN',
        value: '1PN',
    },
    {
        label: 'Căn hộ 2 PN',
        value: '2PN',
    },
    {
        label: 'Căn hộ 3 PN',
        value: '3PN',
    }
];
const services = [
    {
        value: '1',
        label: 'Vé vịnh biển 4 mùa Paradise Ocean Park 3'
    },
    {
        value: '2',
        label: 'Vé Công viên nước Royal Wave Park ( Biển tạo sóng ) - Ocean Park 2'
    },
    {
        value: '3',
        label: 'Vé thuyền Gondola - Mega grand wolrd Hà Nội'
    }
]

const information = ref<string>('');
const minCash = ref(0);
const maxCash = ref(100000000);
const isOpen = ref(false);
</script>